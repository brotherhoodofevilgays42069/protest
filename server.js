require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const zipCodeLookup = require('./zipcodes.js');
const addresses = require('./addresses.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

let geocodeAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const distanceMatrixURL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

const getCoordinates = async (address) => {
    if (zipCodeLookup.hasOwnProperty(address)) {
        return {
            "lat": zipCodeLookup[address][0],
            "lng": zipCodeLookup[address][1]
        };
    }
    else {
        throw new Error(`No results found for address: ${address}`);
    }
};

const getClosestAddress = async (zipCoords) => {
    let closestAddress = null;
    let minDistance = Infinity;

    const destinations = await Promise.all(
        addresses.map(async address => {
            const coords = await getCoordinates(address.zip);
            return `${coords.lat},${coords.lng}`;
        })
    );

    const response = await axios.get(distanceMatrixURL, {
        params: {
            origins: `${zipCoords.lat},${zipCoords.lng}`,
            destinations: destinations.join('|'),
            key: geocodeAPIKey
        }
    });

    const distances = response.data.rows[0].elements;

    distances.forEach((element, index) => {
        if (element.distance.value < minDistance) {
            minDistance = element.distance.value;
            closestAddress = addresses[index].address;
        }
    });

    return closestAddress;
};

app.post('/find-closest', async (req, res) => {
    const { zip } = req.body;
    try {
        const zipCoords = await getCoordinates(zip);
        if (!zipCoords) {
            throw new Error('Failed to fetch coordinates for the provided ZIP code.');
        }
        const closestAddress = await getClosestAddress(zipCoords);
        if (!closestAddress) {
            throw new Error('Failed to determine the closest address.');
        }
        res.json({ closestAddress });
    } catch (error) {
        console.error('Error in /find-closest endpoint:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
