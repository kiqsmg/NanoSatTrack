from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime

from database import get_db, engine
from models import FloripaSat1, Base
from schemas import FloripaSat1Response, LocationResponse
from location_cache import get_country_counts_from_grid_locators

# Import AI service conditionally to avoid startup errors if API key is missing
try:
    from ai_service import ai_service
    AI_SERVICE_AVAILABLE = True
except Exception as e:
    print(f"⚠️ AI Service not available: {e}")
    AI_SERVICE_AVAILABLE = False

# Chat message request model
class ChatMessageRequest(BaseModel):
    message: str
    user_id: str = "default"

# Chat message response model  
class ChatMessageResponse(BaseModel):
    response: str
    timestamp: str
    success: bool

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NanoSatTracker API",
    description="FastAPI backend for NanoSat tracking system",
    version="3.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "NanoSatTracker API v3.0 - FastAPI + PostgreSQL"}

@app.get("/floripasat1/downlink", response_model=List[FloripaSat1Response])
async def get_downlink(db: Session = Depends(get_db)):
    """
    Get all FloripaSat-1 downlink data
    Equivalent to the Express.js route: GET /floripasat1/downlink
    """
    try:
        downlink_data = db.query(FloripaSat1).all()
        return downlink_data
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/floripasat1/location", response_model=List[LocationResponse])
async def get_location(db: Session = Depends(get_db)):
    """
    Get location data processed from grid locators
    Equivalent to the Express.js route: GET /floripasat1/location
    Uses static mapping for fast response (no external API calls)
    """
    try:
        # Get all grid locators from the database
        grid_locators_data = db.query(FloripaSat1.grid_locator).all()
        grid_locators = [item[0] for item in grid_locators_data]
        
        # Process grid locators to get country counts using static mapping
        formatted_locations = get_country_counts_from_grid_locators(grid_locators)
        
        return formatted_locations
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/chat/message", response_model=ChatMessageResponse)
async def chat_message(request: ChatMessageRequest, db: Session = Depends(get_db)):
    """
    Send a message to the AI chatbot and get a response
    """
    if not AI_SERVICE_AVAILABLE:
        raise HTTPException(
            status_code=503, 
            detail="AI service not available. Please check GEMINI_API_KEY environment variable."
        )
    
    try:
        # Get AI response using the satellite data context
        response = await ai_service.generate_response(request.message, db)
        
        return ChatMessageResponse(
            response=response,
            timestamp=datetime.now().isoformat(),
            success=True
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")

@app.get("/chat/history")
async def get_chat_history():
    """
    Get chat history (currently returns empty as it's stored in frontend localStorage)
    """
    return {"messages": [], "note": "Chat history is stored in frontend localStorage"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "version": "3.0.0"}

if __name__ == "__main__":
    import uvicorn
    from config import APIConfig
    uvicorn.run(app, host=APIConfig.HOST, port=APIConfig.PORT) 