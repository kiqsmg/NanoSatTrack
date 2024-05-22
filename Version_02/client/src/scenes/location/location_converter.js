/*-------------------------  Convert gridlocator to a longitude and latitude  -------------------------*/
function gridLocatorToLatLon(grid_locator) {
    // Validate the grid locator length
    if (grid_locator.length !== 6) {
        throw new Error("Invalid grid_locator locator length. It should be 6 characters long.");
    }

    // Convert the first two characters to latitude and longitude  -------------> {charCodeAt(letter number coded}

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

// Example usage
let grid_locator = "JN49lr";
let { latitude, longitude } = gridLocatorToLatLon(grid_locator);
console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);





/*-------------------------  Convert longitude and latitude to an Adress -------------------------*/

async function getAdress(latitude, longitude) {
    const latitude_1 = latitude;
    const longitude_1 = longitude;
    const apiKey = 'AIzaSyDRITWssNUKb8DBeOBbOBuYV9nZLe05B5g';


    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude_1},${longitude_1}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.status ==='OK') {
            const adress = data.results[0].formatted_adress;
            adress.innerText = `Adress: ${adress}`;
        } else {
            adress.innerText = `Geocoding failed: ${data.status}`;
        }
    } catch (error) {
        adress.innerText = `Error ${error.message}`;
    }
}

let {final_adress} = getAdress(latitude, longitude);
console.log(final_adress);