require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const zipCodeLookup = require('./zipcodes.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const addresses = [
    '291 north St, saco, me',
    '326 ibm RD., williston, vt',
    '156 cedar ave, scranton, pa',
    '459 kennedty DR., Archibald PA',
    '11816 n creek pkwy, suite 100 bothell wa',
     '6658 Rt 148, marion, il',
     '200 S pioneer blvd Springboro oh',
     '5000 chesire ln n plymouth mn',
     '4300 industrail ave, Lincoln ne',
     '6345 AR 203 Highway Hampton, AR',
     '1200 n glenbrook dr, garland tx',
     '1425 commercial blvd Anniston AL',
     '7745 Eagle Rd Redstone Arsenal AL',
     '8900 de soto ave canoga park, CA ',
     '1151 W Reeves Ave, Ridgecrest Ca',
     '9401 corbin ave, northridge, ca',
     '16550 w bernardo dr, san diego Ca',
     '7499 pine stake rd, culpeper VA',
     '1250 e aero park blvd tucson, AZ',
     '1 sw 11th st suite 290 lawton OK',
     '210 wv-956, keyser, WV',
     '2211 W North Temple St, Salt Lake City, UT',
     '5000 s 8400 w, Magna UT',
     
];

const geocodeAPIKey = process.env.GOOGLE_MAPS_API_KEY;
const geocodeURL = 'https://maps.googleapis.com/maps/api/geocode/json';
const distanceMatrixURL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

const getCoordinates = async (address) => {
    if (zipCodeLookup.hasOwnProperty(address)) {
        return {
            "lat": zipcodeLookup[address][0],
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
