import dataFloripaSat1 from "../../../../server/data/index5.js";


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
        const country = data.address.country;
        return country;
    } catch (error) {
        console.error('Error:', error);
    }
}

/*-------------------------  Main processing function  -------------------------*/
async function processGridLocators(gridLocators) {
    for (const grid_locator of gridLocators) {
        try {
            const { latitude, longitude } = gridLocatorToLatLon(grid_locator);
            const address = await getAddress(latitude, longitude);
            console.log(`Grid Locator: ${grid_locator} -> Latitude: ${latitude}, Longitude: ${longitude}, Country: ${address}`);
        } catch (error) {
            console.error(`Error processing grid locator ${grid_locator}:`, error);
        }
    }
}

// Start processing
processGridLocators(gridLocators);