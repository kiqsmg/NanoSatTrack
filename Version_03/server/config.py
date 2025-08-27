import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://nanosatuser:password123@localhost:5432/nanosattracker"
)

# FastAPI Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))

# Frontend URL (for CORS)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Database settings
class DatabaseConfig:
    URL = DATABASE_URL
    
class APIConfig:
    HOST = HOST
    PORT = PORT
    FRONTEND_URL = FRONTEND_URL
    ENVIRONMENT = ENVIRONMENT 
# Gemini AI Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

class GeminiConfig:
    API_KEY = GEMINI_API_KEY
    MODEL_NAME = "gemini-2.0-flash"
