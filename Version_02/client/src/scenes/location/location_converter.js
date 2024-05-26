import getCountryIso3 from "country-iso-2-to-3";
import { getCode } from "country-list";

import dataFloripaSat1 from "../../../../server/data/index5";


const gridLocators = dataFloripaSat1.map(item => item.grid_locator);

/*-------------------------  Convert grid_locator to latitude and longitude  -------------------------*/
function gridLocatorToLatLon(grid_locator) {
    // Validate the grid locator length
    if (grid_locator.length !== 6) {
        throw new Error("Invalid grid_locator length. It should be 6 characters long.");
    }

    // Convert the first two characters to latitude and longitude
    let A = grid_locator.charCodeAt(0) - 65; // First character: A-Z (-65 is used to convert it from ASCII value to its correct index-position)
    let B = grid_locator.charCodeAt(1) - 65; // Second character: A-Z (-65 is used to convert it from ASCII value to its correct index-position)
    let C = parseInt(grid_locator.charAt(2)); // Third character: 0-9 (convert string to integer)
    let D = parseInt(grid_locator.charAt(3)); // Fourth character: 0-9 (convert string to integer)
    let E = grid_locator.charCodeAt(4) - 97; // Fifth character: a-x (-97 is used to convert it from ASCII value to its correct index-position)
    let F = grid_locator.charCodeAt(5) - 97; // Sixth character: a-x (-97 is used to convert it from ASCII value to its correct index-position)

    // Calculate the longitude
    let lon = (A * 20) - 180 + (C * 2) + (E / 24);

    // Calculate the latitude
    let lat = (B * 10) - 90 + D + (F / 24);

    return { latitude: lat, longitude: lon };
}

/*-------------------------  Convert longitude and latitude to an address  -------------------------*/
async function getAddress(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let country = data.address.country;
        
        return country;
    } catch (error) {
        console.error('Error:', error);
    }
}

/*-------------------------  ISO-3 function  -------------------------*/
function getIso3Code(countryName) {
    try {
        // Get ISO2 code from country name
        const iso2Code = getCode(countryName);
        if (!iso2Code) {
            throw new Error(`Country name "${countryName}" not found.`);
        }

        // Convert ISO2 code to ISO3
        const iso3Code = getCountryIso3(iso2Code);
        if (!iso3Code) {
            throw new Error(`ISO3 code for "${countryName}" not found.`);
        }

        return iso3Code;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

/*-------------------------  Main processing function  -------------------------*/
async function processGridLocators(gridLocators) {
    for (const grid_locator of gridLocators) {
        try {
            const { latitude, longitude } = gridLocatorToLatLon(grid_locator);
            const country = await getAddress(latitude, longitude);
            const iso3Code = getIso3Code(country);
            console.log(`Grid Locator: ${grid_locator} -> Latitude: ${latitude}, Longitude: ${longitude}, Country: ${country}, ISO: ${iso3Code}`);

        } catch (error) {
            console.error(`Error processing grid locator ${grid_locator}:`, error);
        }
    }
}

// Start processing
processGridLocators(gridLocators);

/*-------------------------  Count countries function  -------------------------*/

//async function countCountries(countryList):


