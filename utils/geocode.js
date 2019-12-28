const request = require("request");



let url = "https://api.darksky.net/forecast/d68fafe7d174882a9dd91f8dbc01af56/18.520430,73.856743";



let url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYWtzaGF5YmFuZU4MSIsImEiOiJjazRoYnV5YnExNHN0M29xcXM4b2hqeTRoIn0.6jKa5DB3iUoq0Ed-6GyexA&limit=1";


function getCoordinates(address, callback) {
    let url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWtzaGF5YmFuZGU4MSIsImEiOiJjazRoYnV5YnExNHN0M29xcXM4b2hqeTRoIn0.6jKa5DB3iUoq0Ed-6GyexA`;
    console.log("fetching for", url1);
    request({
        url: url1,
        json: true
    }, (err, response, body) => {
        
        if (err) {
            console.log("Error can't reach to the server");
            callback("Error can't reach to the server", undefined);
        }
        else {

            const data = body;

            if (body.features && body.features.length > 0) {

                let [long, lat, place_name] = [body.features[0].center[0], body.features[0].center[1], body.features[0].place_name];
                callback(undefined, { latitude: lat, longitude: long });
            }
            else {

                callback("No results for give location", undefined);
            }
        }
    })

}


module.exports = {
    getCoordinates: getCoordinates
}