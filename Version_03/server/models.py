from sqlalchemy import Column, Integer, String, Float, DateTime, func
from database import Base

class FloripaSat1(Base):
    __tablename__ = "floripasat1_data"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Timestamp fields
    name = Column(String(100), nullable=False)
    year = Column(Integer, nullable=False)
    month = Column(Integer, nullable=False)
    day = Column(Integer, nullable=False)
    hour = Column(Integer, nullable=False)
    minute = Column(Integer, nullable=False)
    second = Column(Integer, nullable=False)
    
    # Battery data
    battery_cell_1_voltage = Column(Float, nullable=False)
    battery_cell_2_voltage = Column(Float, nullable=False)
    battery_temperature = Column(Float, nullable=False)
    battery_current = Column(Float, nullable=False)
    battery_charge = Column(Float, nullable=False)
    
    # Solar panel currents
    sp_01_current = Column(Float, nullable=False)
    sp_02_current = Column(Float, nullable=False)
    sp_03_current = Column(Float, nullable=False)
    sp_04_current = Column(Float, nullable=False)
    sp_05_current = Column(Float, nullable=False)
    sp_06_current = Column(Float, nullable=False)
    
    # Solar panel voltages
    sp_01_02_voltage = Column(Float, nullable=False)
    sp_03_04_voltage = Column(Float, nullable=False)
    sp_05_06_voltage = Column(Float, nullable=False)
    
    # Energy level
    energy_level = Column(Float, nullable=False)
    
    # Reserved fields
    reserved_21 = Column(String)
    reserved_22 = Column(String)
    reserved_23 = Column(String)
    reserved_24 = Column(String)
    reserved_25 = Column(String)
    reserved_26 = Column(String)
    reserved_27 = Column(String)
    reserved_28 = Column(String)
    reserved_29 = Column(String)
    reserved_30 = Column(String)
    reserved_31 = Column(String)
    reserved_32 = Column(String)
    reserved_33 = Column(String)
    reserved_34 = Column(String)
    reserved_35 = Column(String)
    
    # Temperature and radio data
    eps_temperature = Column(Float, nullable=False)
    satnogs = Column(String, nullable=False)
    callsign = Column(String, nullable=False)
    grid_locator = Column(String, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 