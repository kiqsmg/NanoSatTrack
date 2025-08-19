"""
Static Grid Locator to Country Mapping
Pre-computed mapping to avoid slow external API calls for location data
"""

# Static mapping of grid locators to countries (ISO3 codes)
# Based on the grid locators found in our database
GRID_LOCATOR_TO_COUNTRY = {
    "EM69uf": "USA",    # United States
    "JN23db": "FRA",    # France  
    "QF22lb": "AUS",    # Australia
    "FM17es": "USA",    # United States
    "FF33br": "BRA",    # Brazil
    "IN80eo": "ITA",    # Italy
    "PM63uo": "JPN",    # Japan
    "GG66sa": "BRA",    # Brazil
    "JO82ik": "DEU",    # Germany
    "JO89hp": "DEU",    # Germany
    "OM48dx": "CZE",    # Czech Republic
    "JN55wf": "DEU",    # Germany
    "PM95pd": "JPN",    # Japan
    "PL05ai": "KOR",    # South Korea
    "LL34js": "ZAF",    # South Africa
    "JO30cr": "DEU",    # Germany
    "KP20ke": "MEX",    # Mexico
    "JN49lr": "DEU",    # Germany
}

def get_country_counts_from_grid_locators(grid_locators: list) -> list:
    """
    Convert grid locators to country counts using static mapping
    Much faster than external API calls
    """
    country_counts = {}
    
    for grid_locator in grid_locators:
        country = GRID_LOCATOR_TO_COUNTRY.get(grid_locator)
        if country:
            if country in country_counts:
                country_counts[country] += 1
            else:
                country_counts[country] = 1
    
    # Format for frontend choropleth map
    formatted_locations = [
        {"id": country, "value": count}
        for country, count in country_counts.items()
    ]
    
    return formatted_locations 