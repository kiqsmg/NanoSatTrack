"""
Data Migration Script: MongoDB to PostgreSQL
Migrates data from Version_02 (MongoDB) to Version_03 (PostgreSQL)
"""

import json
import sys
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import FloripaSat1, Base
from typing import Dict, Any

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")

def map_mongo_to_postgres(mongo_doc: Dict[str, Any]) -> Dict[str, Any]:
    """
    Map MongoDB document fields to PostgreSQL fields
    Handle any field name differences or data type conversions
    """
    # Remove MongoDB specific fields
    postgres_data = {}
    
    # Map fields (most are direct mappings)
    field_mappings = {
        'name': 'name',
        'year': 'year',
        'month': 'month',
        'day': 'day',
        'hour': 'hour',
        'minute': 'minute',
        'second': 'second',
        'battery_cell_1_voltage': 'battery_cell_1_voltage',
        'battery_cell_2_voltage': 'battery_cell_2_voltage',
        'battery_temperature': 'battery_temperature',
        'battery_current': 'battery_current',
        'battery_charge': 'battery_charge',
        'sp_01_current': 'sp_01_current',
        'sp_02_current': 'sp_02_current',
        'sp_03_current': 'sp_03_current',
        'sp_04_current': 'sp_04_current',
        'sp_05_current': 'sp_05_current',
        'sp_06_current': 'sp_06_current',
        'sp_01_02_voltage': 'sp_01_02_voltage',
        'sp_03_04_voltage': 'sp_03_04_voltage',
        'sp_05_06_voltage': 'sp_05_06_voltage',
        'energy_level': 'energy_level',
        'reserved_21': 'reserved_21',
        'reserved_22': 'reserved_22',
        'reserved_23': 'reserved_23',
        'reserved_24': 'reserved_24',
        'reserved_25': 'reserved_25',
        'reserved_26': 'reserved_26',
        'reserved_27': 'reserved_27',
        'reserved_28': 'reserved_28',
        'reserved_29': 'reserved_29',
        'reserved_30': 'reserved_30',
        'reserved_31': 'reserved_31',
        'reserved_32': 'reserved_32',
        'reserved_33': 'reserved_33',
        'reserved_34': 'reserved_34',
        'reserved_35': 'reserved_35',
        'eps_temperature': 'eps_temperature',
        'satNOGS': 'satnogs',  # Note: field name change
        'callsign': 'callsign',
        'grid_locator': 'grid_locator'
    }
    
    for mongo_field, postgres_field in field_mappings.items():
        if mongo_field in mongo_doc:
            postgres_data[postgres_field] = mongo_doc[mongo_field]
    
    return postgres_data

def migrate_from_json(json_file_path: str):
    """
    Migrate data from a JSON export file
    Usage: mongoexport --db your_db --collection floripasats --out data.json
    """
    
    db: Session = SessionLocal()
    
    try:
        with open(json_file_path, 'r') as file:
            # Handle both single JSON object and JSONL format
            content = file.read().strip()
            
            if content.startswith('['):
                # JSON array format
                data = json.loads(content)
            else:
                # JSONL format (one JSON object per line)
                data = []
                for line in content.split('\n'):
                    if line.strip():
                        data.append(json.loads(line))
        
        print(f"📖 Found {len(data)} records to migrate")
        
        migrated_count = 0
        error_count = 0
        
        for i, mongo_doc in enumerate(data):
            try:
                # Map MongoDB document to PostgreSQL format
                postgres_data = map_mongo_to_postgres(mongo_doc)
                
                # Create new FloripaSat1 record
                db_record = FloripaSat1(**postgres_data)
                db.add(db_record)
                
                migrated_count += 1
                
                # Commit in batches for better performance
                if migrated_count % 100 == 0:
                    db.commit()
                    print(f"✅ Migrated {migrated_count}/{len(data)} records")
                    
            except Exception as e:
                error_count += 1
                print(f"❌ Error migrating record {i}: {e}")
                print(f"   Data: {mongo_doc}")
                db.rollback()
        
        # Final commit
        db.commit()
        
        print(f"\n🎉 Migration Complete!")
        print(f"✅ Successfully migrated: {migrated_count} records")
        print(f"❌ Errors: {error_count} records")
        
    except FileNotFoundError:
        print(f"❌ File not found: {json_file_path}")
        print(f"💡 Export data from MongoDB first:")
        print(f"   mongoexport --db your_db --collection floripasats --out {json_file_path}")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        db.rollback()
        
    finally:
        db.close()

def verify_migration():
    """Verify the migration by checking record counts and sample data"""
    
    db: Session = SessionLocal()
    
    try:
        # Count records
        total_records = db.query(FloripaSat1).count()
        print(f"📊 Total records in PostgreSQL: {total_records}")
        
        if total_records > 0:
            # Show sample records
            sample_records = db.query(FloripaSat1).limit(3).all()
            print(f"\n📋 Sample records:")
            
            for i, record in enumerate(sample_records, 1):
                print(f"  {i}. ID: {record.id}, Name: {record.name}, "
                      f"Date: {record.year}-{record.month:02d}-{record.day:02d}, "
                      f"Grid: {record.grid_locator}")
            
            # Show unique grid locators for location endpoint testing
            unique_grids = db.query(FloripaSat1.grid_locator).distinct().limit(5).all()
            grid_list = [grid[0] for grid in unique_grids]
            print(f"\n🌍 Sample grid locators: {grid_list}")
            
        else:
            print("⚠️  No records found. Migration may have failed.")
            
    except Exception as e:
        print(f"❌ Verification failed: {e}")
        
    finally:
        db.close()

def main():
    """Main migration function"""
    
    if len(sys.argv) != 2:
        print("🔧 Usage: python migrate_data.py <json_file_path>")
        print("\n📝 Steps:")
        print("1. Export from MongoDB:")
        print("   cd ../Version_02/server")
        print("   mongoexport --db your_db --collection floripasats --out floripasat_data.json")
        print("\n2. Run migration:")
        print("   python migrate_data.py ../Version_02/server/floripasat_data.json")
        print("\n3. Verify migration:")
        print("   python migrate_data.py verify")
        return
    
    command = sys.argv[1]
    
    if command == "verify":
        print("🔍 Verifying migration...")
        verify_migration()
    else:
        json_file = command
        print(f"🚀 Starting migration from {json_file}")
        
        # Create tables first
        create_tables()
        
        # Run migration
        migrate_from_json(json_file)
        
        # Verify results
        print("\n🔍 Verifying migration...")
        verify_migration()

if __name__ == "__main__":
    main() 