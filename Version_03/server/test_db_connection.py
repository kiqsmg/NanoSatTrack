#!/usr/bin/env python3
"""
Test Database Connection
Verifies that FastAPI can connect to PostgreSQL
"""

import sys
import os

# Add the server directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import engine, SessionLocal
from models import Base, FloripaSat1
from sqlalchemy import text

def test_connection():
    """Test basic database connection"""
    try:
        # Test engine connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Database connection successful!")
            print(f"📊 PostgreSQL version: {version}")
            return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_table_creation():
    """Test table creation"""
    try:
        # Create all tables
        Base.metadata.create_all(bind=engine)
        print(f"✅ Database tables created successfully!")
        
        # Verify tables exist
        with engine.connect() as connection:
            result = connection.execute(text("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public'
            """))
            tables = [row[0] for row in result.fetchall()]
            print(f"📋 Tables created: {tables}")
            return True
            
    except Exception as e:
        print(f"❌ Table creation failed: {e}")
        return False

def test_session():
    """Test database session"""
    try:
        db = SessionLocal()
        
        # Test a simple query
        count = db.query(FloripaSat1).count()
        print(f"✅ Database session working!")
        print(f"📊 Current records in FloripaSat1 table: {count}")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Database session failed: {e}")
        return False

def main():
    """Run all database tests"""
    print("🧪 Testing Database Connection for NanoSatTracker Version_03")
    print("=" * 60)
    
    # Test 1: Basic connection
    print("\n1️⃣ Testing basic database connection...")
    connection_ok = test_connection()
    
    if not connection_ok:
        print("❌ Cannot proceed without database connection. Check your PostgreSQL setup.")
        return False
    
    # Test 2: Table creation
    print("\n2️⃣ Testing table creation...")
    tables_ok = test_table_creation()
    
    if not tables_ok:
        print("❌ Table creation failed. Check your database permissions.")
        return False
    
    # Test 3: Session handling
    print("\n3️⃣ Testing database session...")
    session_ok = test_session()
    
    if not session_ok:
        print("❌ Session handling failed.")
        return False
    
    # Final summary
    print("\n" + "=" * 60)
    print("🎉 All database tests passed! Your PostgreSQL setup is ready.")
    print("\n📝 Next steps:")
    print("   1. Start the FastAPI server: python main.py")
    print("   2. Test API endpoints: http://localhost:8000/docs")
    print("   3. Import data if available: python migrate_data.py <data_file>")
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 