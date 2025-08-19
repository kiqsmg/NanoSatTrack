import google.generativeai as genai
from sqlalchemy.orm import Session
from typing import List, Dict, Any, Optional
import json
from datetime import datetime, date
from decimal import Decimal

from config import GeminiConfig
from database import get_db
from models import FloripaSat1
from schemas import FloripaSat1Response

class SatelliteDataAI:
    """
    🛰️ Intelligent AI Assistant for FloripaSat-1 Satellite Data Analysis
    
    This service integrates Google Gemini AI to provide natural language
    interaction with satellite telemetry data, offering insights, analysis,
    and technical explanations about the FloripaSat-1 mission.
    """
    
    def __init__(self):
        """Initialize the AI service with Gemini configuration"""
        if not GeminiConfig.API_KEY:
            raise ValueError("❌ GEMINI_API_KEY not found in environment variables!")
        
        # Configure Gemini AI
        genai.configure(api_key=GeminiConfig.API_KEY)
        self.model = genai.GenerativeModel(GeminiConfig.MODEL_NAME)
        
        # System context about the satellite mission
        self.system_context = """
        🛰️ **FLORIPASATS-1 MISSION CONTEXT**
        
        You are an AI assistant specialized in analyzing data from FloripaSat-1, 
        a nanosatellite mission. The satellite contains the following systems:
        
        **ELECTRICAL POWER SYSTEM (EPS):**
        - 4 Battery cells (voltage monitoring)
        - 3 Solar panels (current generation)
        - EPS temperature monitoring
        - Power management and distribution
        
        **TELEMETRY SYSTEMS:**
        - Ground station communications
        - Grid locator positioning
        - SatNOGS network integration
        - Callsign identification
        
        **DATA FIELDS AVAILABLE:**
        - Battery voltages (cells 1-4) in Volts
        - Solar panel currents (SP 01-03) in Amperes  
        - EPS temperature in Celsius
        - Timestamps and location data
        - Ground station callsigns and grid locators
        
        **YOUR ROLE:**
        - Answer questions about satellite performance
        - Explain technical concepts in simple terms
        - Identify trends and anomalies in the data
        - Provide educational insights about space technology
        - Generate helpful data analysis and visualizations suggestions
        
        **COMMUNICATION STYLE:**
        - Be enthusiastic about space technology! 🚀
        - Use emojis to make explanations engaging
        - Explain technical terms for non-experts
        - Provide specific data when available
        - Suggest follow-up questions or analysis
        """
    
    def _serialize_data(self, obj: Any) -> Any:
        """Convert database objects to JSON-serializable format"""
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        elif hasattr(obj, '__dict__'):
            return {key: self._serialize_data(value) for key, value in obj.__dict__.items() 
                   if not key.startswith('_')}
        elif isinstance(obj, list):
            return [self._serialize_data(item) for item in obj]
        else:
            return obj
    
    def get_satellite_data_context(self, db: Session, limit: int = 10) -> str:
        """Get recent satellite data for AI context"""
        try:
            # Get recent satellite data
            recent_data = db.query(FloripaSat1).order_by(FloripaSat1.created_at.desc()).limit(limit).all()
            
            if not recent_data:
                return "⚠️ No satellite data available in database."
            
            # Convert to serializable format
            data_list = []
            for record in recent_data:
                data_dict = self._serialize_data(record)
                data_list.append(data_dict)
            
            # Get data statistics
            total_records = db.query(FloripaSat1).count()
            
            context = f"""
            📊 **CURRENT SATELLITE DATA SUMMARY**
            
            **Database Status:** {total_records} total records available
            **Recent Data:** Last {len(recent_data)} entries shown below
            
            **Sample Data Records:**
            {json.dumps(data_list, indent=2)}
            
            **Data Field Descriptions:**
            - battery_cell_X_voltage: Battery cell voltage in Volts
            - sp_0X_current: Solar panel current in Amperes
            - eps_temperature: Electrical Power System temperature in °C
            - grid_locator: Ham radio grid square location
            - callsign: Ground station identifier
            - satnogs: SatNOGS network ID
            """
            
            return context
            
        except Exception as e:
            return f"❌ Error retrieving satellite data: {str(e)}"
    
    async def generate_response(self, user_message: str, db: Session) -> str:
        """Generate AI response to user query about satellite data"""
        try:
            # Get current satellite data context
            data_context = self.get_satellite_data_context(db)
            
            # Construct the full prompt
            full_prompt = f"""
            {self.system_context}
            
            {data_context}
            
            **USER QUESTION:** {user_message}
            
            **INSTRUCTIONS:**
            1. Answer the user's question using the satellite data provided
            2. Be specific with numbers and dates when available
            3. Explain technical concepts clearly
            4. Use emojis to make your response engaging
            5. If you don't have specific data, explain what you would need
            6. Suggest follow-up questions or analysis opportunities
            7. Keep responses conversational and helpful
            
            **RESPONSE:**
            """
            
            # Generate AI response
            response = self.model.generate_content(full_prompt)
            
            if response and response.text:
                return response.text
            else:
                return "🤔 I couldn't generate a response. Please try rephrasing your question!"
                
        except Exception as e:
            return f"❌ AI Service Error: {str(e)}\n\n🔧 Please check your Gemini API key and try again."
    
    async def analyze_anomalies(self, db: Session) -> str:
        """Detect and analyze anomalies in satellite data"""
        try:
            # Get recent data for anomaly analysis
            recent_data = db.query(FloripaSat1).order_by(FloripaSat1.created_at.desc()).limit(100).all()
            
            if len(recent_data) < 10:
                return "📊 Not enough data for anomaly analysis. Need at least 10 records."
            
            data_context = json.dumps([self._serialize_data(record) for record in recent_data], indent=2)
            
            prompt = f"""
            {self.system_context}
            
            **ANOMALY DETECTION TASK**
            
            Analyze the following satellite data for anomalies, unusual patterns, or concerning trends:
            
            {data_context}
            
            **ANALYSIS REQUIREMENTS:**
            1. Look for unusual battery voltage patterns
            2. Identify solar panel performance issues  
            3. Check for temperature anomalies
            4. Find any data that seems out of normal range
            5. Suggest possible causes for anomalies
            6. Recommend monitoring or investigation steps
            
            **FORMAT YOUR RESPONSE AS:**
            🔍 **ANOMALY ANALYSIS REPORT**
            
            **DETECTED ANOMALIES:**
            [List any found anomalies with specific data points]
            
            **NORMAL PATTERNS:**
            [Describe what appears normal]
            
            **RECOMMENDATIONS:**
            [Suggest next steps or monitoring]
            """
            
            response = self.model.generate_content(prompt)
            return response.text if response and response.text else "🤔 Couldn't complete anomaly analysis."
            
        except Exception as e:
            return f"❌ Anomaly Analysis Error: {str(e)}"
    
    def get_help_message(self) -> str:
        """Get help information about available commands"""
        return """
        🤖 **FLORIPASATS-1 AI ASSISTANT HELP**
        
        **WHAT I CAN DO:**
        🛰️ Answer questions about satellite telemetry data
        📊 Analyze battery, solar panel, and temperature trends  
        🔍 Detect anomalies and unusual patterns
        🎓 Explain space technology concepts
        📈 Suggest data visualizations and analysis
        
        **EXAMPLE QUESTIONS:**
        • "What was the battery voltage on January 15th?"
        • "Which solar panel is performing best?"
        • "Explain EPS temperature readings"
        • "Find any unusual patterns in the data"
        • "How does satellite power management work?"
        • "Show me the latest telemetry data"
        
        **SPECIAL COMMANDS:**
        • Type "analyze anomalies" for automated anomaly detection
        • Ask about specific dates, components, or trends
        • Request explanations of technical terms
        
        **💡 TIP:** I work best with specific questions about the satellite data!
        
        🚀 Ready to explore your satellite mission data!
        """

# Create global AI service instance
ai_service = SatelliteDataAI()
