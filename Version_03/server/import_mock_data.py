#!/usr/bin/env python3
"""
Import Mock Data Script
Converts JavaScript mock data from Version_02 to PostgreSQL in Version_03
"""

import sys
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import FloripaSat1, Base

def parse_js_data_file(file_path: str) -> list:
    """
    Parse JavaScript data file by executing it with Node.js and converting to JSON
    Handles the Version_03 mock_data.js format with generated data
    """
    import subprocess
    import json
    import tempfile
    import os
    
    try:
        # Get absolute path to the JavaScript file
        abs_file_path = os.path.abspath(file_path)
        
        # Create a temporary JavaScript file that imports the data and outputs as JSON
        temp_js_content = f'''
// Import the data from the mock_data.js file
import {{ received_Data }} from 'file://{abs_file_path}';

// Output as JSON
console.log(JSON.stringify(received_Data, null, 0));
'''
        
        # Write temporary file
        with tempfile.NamedTemporaryFile(mode='w', suffix='.mjs', delete=False) as temp_file:
            temp_file.write(temp_js_content)
            temp_file_path = temp_file.name
        
        try:
            # Run Node.js to execute the file and get JSON output
            result = subprocess.run(
                ['node', temp_file_path],
                capture_output=True,
                text=True,
                check=True
            )
            
            # Parse the JSON output
            data_objects = json.loads(result.stdout)
            print(f"✅ Generated and parsed {len(data_objects)} objects from JavaScript file")
            return data_objects
            
        finally:
            # Clean up temporary file
            os.unlink(temp_file_path)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Error executing JavaScript file: {e}")
        print(f"   stdout: {e.stdout}")
        print(f"   stderr: {e.stderr}")
        return []
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON output: {e}")
        return []
    except Exception as e:
        print(f"❌ Error processing JavaScript file: {e}")
        return []

# Removed parse_js_object function - not needed with Node.js approach

def import_data_to_postgres(data_objects: list):
    """
    Import the parsed data objects into PostgreSQL
    """
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Clear existing data
        db.query(FloripaSat1).delete()
        db.commit()
        print("🗑️  Cleared existing data")
        
        imported_count = 0
        error_count = 0
        
        for obj in data_objects:
            try:
                # Map field names (handle satNOGS -> satnogs)
                if 'satNOGS' in obj:
                    obj['satnogs'] = obj.pop('satNOGS')
                
                # Create FloripaSat1 record
                db_record = FloripaSat1(**obj)
                db.add(db_record)
                imported_count += 1
                
                # Commit in batches for better performance
                if imported_count % 50 == 0:
                    db.commit()
                    print(f"📊 Imported {imported_count} records...")
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error importing record {imported_count + error_count}: {e}")
                db.rollback()
        
        # Final commit
        db.commit()
        
        print(f"\n🎉 Import Complete!")
        print(f"✅ Successfully imported: {imported_count} records")
        print(f"❌ Errors: {error_count} records")
        
        return imported_count > 0
        
    except Exception as e:
        print(f"❌ Import failed: {e}")
        db.rollback()
        return False
        
    finally:
        db.close()

def verify_import():
    """
    Verify the imported data
    """
    db: Session = SessionLocal()
    
    try:
        # Count total records
        total_records = db.query(FloripaSat1).count()
        print(f"\n📊 Verification Results:")
        print(f"Total records in database: {total_records}")
        
        if total_records > 0:
            # Show sample records
            sample_records = db.query(FloripaSat1).limit(3).all()
            print(f"\n📋 Sample records:")
            
            for i, record in enumerate(sample_records, 1):
                print(f"  {i}. ID: {record.id}, Name: {record.name}")
                print(f"     Date: {record.year}-{record.month:02d}-{record.day:02d} {record.hour:02d}:{record.minute:02d}:{record.second:02d}")
                print(f"     Grid: {record.grid_locator}, Callsign: {record.callsign}")
                print(f"     Battery: {record.battery_cell_1_voltage}V, Temp: {record.battery_temperature}°C")
            
            # Show unique grid locators for location testing
            unique_grids = db.query(FloripaSat1.grid_locator).distinct().limit(10).all()
            grid_list = [grid[0] for grid in unique_grids]
            print(f"\n🌍 Sample grid locators for location API: {grid_list}")
            
        return total_records > 0
        
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        return False
        
    finally:
        db.close()

def main():
    """
    Main import function
    """
    print("🚀 Starting Mock Data Import for NanoSatTracker Version_03")
    print("=" * 60)
    
    # Path to the mock data file
    js_file_path = "data/mock_data.js"
    
    print(f"📂 Reading data from: {js_file_path}")
    
    # Parse JavaScript data
    data_objects = parse_js_data_file(js_file_path)
    
    if not data_objects:
        print("❌ No data to import. Exiting.")
        return False
    
    # Import to PostgreSQL
    print(f"\n💾 Importing {len(data_objects)} records to PostgreSQL...")
    success = import_data_to_postgres(data_objects)
    
    if success:
        # Verify import
        print(f"\n🔍 Verifying imported data...")
        verify_import()
        
        print(f"\n" + "=" * 60)
        print(f"🎉 Mock data import successful!")
        print(f"\n📝 Next steps:")
        print(f"   1. Test API endpoints: http://localhost:8000/docs")
        print(f"   2. Check downlink data: http://localhost:8000/floripasat1/downlink")
        print(f"   3. Check location data: http://localhost:8000/floripasat1/location")
        print(f"   4. Start the frontend: cd ../client && npm start")
        
        return True
    else:
        print(f"❌ Import failed. Check the errors above.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 