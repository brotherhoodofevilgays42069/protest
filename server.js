require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const addresses = [
    '1600 Amphitheatre Parkway, Mountain View, CA',
    '1 Infinite Loop, Cupertino, CA',
    '1601 Willow Road, Menlo Park, CA',
    '1 Hacker Way, Menlo Park, CA',
    '500 Terry Francois Blvd, San Francisco, CA',
    '1355 Market St, San Francisco, CA',
    '1455 Market St, San Francisco, CA',
    '275 Battery St, San Francisco, CA',
    '343 Sansome St, San Francisco, CA',
    '505 Montgomery St, San Francisco, CA',
    '799 Market St, San Francisco, CA',
    '44 Montgomery St, San Francisco, CA',
    '123 Mission St, San Francisco, CA',
    '600 Montgomery St, San Francisco, CA',
    '1 Post St, San Francisco, CA'
];

const geocodeAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const distanceMatrixURL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

const getCoordinates = async (address) => {
    const response = await axios.get(geocodeURL, {
        params: { address: address, key: geocodeAPIKey }
    });

    if (response.data.results.length === 0) {
        throw new Error(`No results found for address: ${address}`);
    }

    return response.data.results[0].geometry.location;
};

const getClosestAddress = async (zipCoords) => {
    let closestAddress = null;
    let minDistance = Infinity;

    const destinations = await Promise.all(
        addresses.map(async address => {
            const coords = await getCoordinates(address);
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
            closestAddress = addresses[index];
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
