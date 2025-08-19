from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FloripaSat1Base(BaseModel):
    name: str
    year: int
    month: int
    day: int
    hour: int
    minute: int
    second: int
    
    # Battery data
    battery_cell_1_voltage: float
    battery_cell_2_voltage: float
    battery_temperature: float
    battery_current: float
    battery_charge: float
    
    # Solar panel currents
    sp_01_current: float
    sp_02_current: float
    sp_03_current: float
    sp_04_current: float
    sp_05_current: float
    sp_06_current: float
    
    # Solar panel voltages
    sp_01_02_voltage: float
    sp_03_04_voltage: float
    sp_05_06_voltage: float
    
    # Energy level
    energy_level: float
    
    # Reserved fields
    reserved_21: Optional[str] = None
    reserved_22: Optional[str] = None
    reserved_23: Optional[str] = None
    reserved_24: Optional[str] = None
    reserved_25: Optional[str] = None
    reserved_26: Optional[str] = None
    reserved_27: Optional[str] = None
    reserved_28: Optional[str] = None
    reserved_29: Optional[str] = None
    reserved_30: Optional[str] = None
    reserved_31: Optional[str] = None
    reserved_32: Optional[str] = None
    reserved_33: Optional[str] = None
    reserved_34: Optional[str] = None
    reserved_35: Optional[str] = None
    
    # Temperature and radio data
    eps_temperature: float
    satnogs: str
    callsign: str
    grid_locator: str

class FloripaSat1Create(FloripaSat1Base):
    pass

class FloripaSat1Response(FloripaSat1Base):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class LocationResponse(BaseModel):
    id: str
    value: int 