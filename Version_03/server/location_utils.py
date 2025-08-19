import httpx
from typing import List, Dict, Optional

def grid_locator_to_lat_lon(grid_locator: str) -> Dict[str, float]:
    """Convert grid locator to latitude and longitude"""
    if len(grid_locator) != 6:
        raise ValueError("Invalid grid_locator length. It should be 6 characters long.")
    
    # Convert characters to values
    A = ord(grid_locator[0]) - 65  # First character: A-Z
    B = ord(grid_locator[1]) - 65  # Second character: A-Z
    C = int(grid_locator[2])       # Third character: 0-9
    D = int(grid_locator[3])       # Fourth character: 0-9
    E = ord(grid_locator[4]) - 97  # Fifth character: a-x
    F = ord(grid_locator[5]) - 97  # Sixth character: a-x
    
    # Calculate longitude and latitude
    longitude = (A * 20) - 180 + (C * 2) + (E / 24)
    latitude = (B * 10) - 90 + D + (F / 24)
    
    return {"latitude": latitude, "longitude": longitude}

async def get_address(latitude: float, longitude: float) -> Optional[str]:
    """Get country name from latitude and longitude using OpenStreetMap"""
    url = f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={latitude}&lon={longitude}"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()
            
            if "address" not in data or "country" not in data["address"]:
                return None
                
            country = data["address"]["country"]
            
            # Normalize country names
            country_mapping = {
                "United States": "United States of America",
                "Polska": "Poland",
                "België / Belgique / Belgien": "Belgium",
                "السعودية": "Saudi Arabia",
                "日本": "Japan",
                "Deutschland": "Germany"
            }
            
            return country_mapping.get(country, country)
            
    except Exception as e:
        print(f"Error getting address: {e}")
        return None

def get_iso3_code(country_name: str) -> Optional[str]:
    """Convert country name to ISO3 code"""
    # This is a simplified mapping. In production, you'd use a proper library
    # like pycountry or maintain a comprehensive mapping
    country_to_iso3 = {
        "United States of America": "USA",
        "Germany": "DEU",
        "South Africa": "ZAF",
        "Poland": "POL",
        "Belgium": "BEL",
        "Saudi Arabia": "SAU",
        "Japan": "JPN",
        "Brazil": "BRA",
        "Canada": "CAN",
        "France": "FRA",
        "United Kingdom": "GBR",
        "Italy": "ITA",
        "Spain": "ESP",
        "Netherlands": "NLD",
        "Australia": "AUS",
        "China": "CHN",
        "India": "IND",
        "Russia": "RUS"
    }
    
    return country_to_iso3.get(country_name)

def get_list_count(countries_list: List[str]) -> List[Dict[str, any]]:
    """Count occurrences of each country and format for frontend"""
    countries_counts = {}
    
    for country in countries_list:
        if country in countries_counts:
            countries_counts[country] += 1
        else:
            countries_counts[country] = 1
    
    formatted_locations = [
        {"id": country, "value": count}
        for country, count in countries_counts.items()
    ]
    
    return formatted_locations

async def process_grid_locators(grid_locators: List[str]) -> List[Dict[str, any]]:
    """Process a list of grid locators and return country counts"""
    countries_list = []
    
    for grid_locator in grid_locators:
        try:
            coords = grid_locator_to_lat_lon(grid_locator)
            country = await get_address(coords["latitude"], coords["longitude"])
            
            if country:
                iso3_code = get_iso3_code(country)
                if iso3_code:
                    countries_list.append(iso3_code)
                    
        except Exception as e:
            print(f"Error processing grid locator {grid_locator}: {e}")
    
    return get_list_count(countries_list) 