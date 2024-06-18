const addresses = [
    {
        address: '291 North St,,Saco,ME,04072',
        street: '291 North St',
        unit: '',
        city: 'Saco',
        state: 'ME',
        zip: '04072'
    },
    {
        address: '326 IBM Rd,,Williston,VT,05495',
        street: '326 IBM Rd',
        unit: '',
        city: 'Williston',
        state: 'VT',
        zip: '05495'
    },
    {
        address: '156 Cedar Ave,,Scranton,PA,18505',
        street: '156 Cedar Ave',
        unit: '',
        city: 'Scranton',
        state: 'PA',
        zip: '18505'
    },
    {
        address: '459 Kennedy Dr,,Archibald,PA,18403',
        street: '459 Kennedy Dr',
        unit: '',
        city: 'Archibald',
        state: 'PA',
        zip: '18403'
    },
    {
        address: '11816 N Creek Pkwy,Suite 100,Bothell,WA,98011',
        street: '11816 N Creek Pkwy',
        unit: 'Suite 100',
        city: 'Bothell',
        state: 'WA',
        zip: '98011'
    },
    {
        address: '6658 Rt 148,,Marion,IL,62959',
        street: '6658 Rt 148',
        unit: '',
        city: 'Marion',
        state: 'IL',
        zip: '62959'
    },
    {
        address: '200 S Pioneer Blvd,,Springboro,OH,45066',
        street: '200 S Pioneer Blvd',
        unit: '',
        city: 'Springboro',
        state: 'OH',
        zip: '45066'
    },
    {
        address: '5000 Chesshire Ln,,Plymouth,MN,55446',
        street: '5000 Chesshire Ln',
        unit: '',
        city: 'Plmouth',
        state: 'MN',
        zip: '55446'
    },
    {
        address: '4300 Industrial Ave,,Lincoln,NE,68504',
        street: '4300 Industrial Ave',
        unit: '',
        city: 'Lincoln',
        state: 'NE',
        zip: '68504'
    },
    {
        address: '6345 AR-203 Highway,,Hampton,AR,71744',
        street: '6345 AR-203 Highway',
        unit: '',
        city: 'Hampton',
        state: 'AR',
        zip: '71744'
    },
    {
        address: '1200 N Glenbrook Dr, Garland,,TX,75040',
        street: '1200 N Glenbrook Dr',
        unit: '',
        city: 'Garland',
        state: 'TX',
        zip: '75040'
    },
    {
        address: '1425 Commercial Blvd,,Anniston AL,36207',
        street: '1425 Commercial Blvd',
        unit: '',
        city: 'Anniston',
        state: 'AL',
        zip: '36207'
    },
    {
        address: '7745 Eagle Rd,,Redstone Arsenal,AL,35803',
        street: '7745 Eagle Rd',
        unit: '',
        city: 'Redstone Arsenal',
        state: 'AL',
        zip: '35803'
    },
    {
        address: '8900 De Soto Ave,,Canoga Park,CA,91304',
        street: '8900 De Soto Ave',
        unit: '',
        city: 'Canoga Park',
        state: 'CA',
        zip: '91304'
    },
    {
        address: '1151 W Reeves Ave,Ridgecrest,CA,93555',
        street: '1151 W Reeves Ave',
        unit: '',
        city: 'Ridgecrest',
        state: 'CA',
        zip: '93555'
    },
    {
        address: '9401 Corbin Ave,,Northridge,CA,91324',
        street: '9401 Corbin Ave',
        unit: '',
        city: 'Nortridge',
        state: 'CA',
        zip: '91324'
    },
    {
        address: '16550 W Bernardo Dr,,San Diego,CA,92127',
        street: '16550 W Bernardo Dr',
        unit: '',
        city: 'San Diego',
        state: 'CA',
        zip: '92127'
    },
    {
        address: '7499 Pine Stake Rd,,Culpeper,VA,22701',
        street: '7499 Pine Stake Rd',
        unit: '',
        city: 'Culpeper',
        state: 'VA',
        zip: '22701'
    },
    {
        address: '1250 E Aero Park Blvd,,Tucson,AZ,85756',
        street: '1250 E Aero Park Blvd',
        unit: '',
        city: 'Tucson',
        state: 'AZ',
        zip: '85756'
    },
    {
        address: '1 SW 11th St,Suite 290,Lawton,OK,73501',
        street: '1 SW 11th St',
        unit: 'Suite 290',
        city: 'Lawton',
        state: 'OK',
        zip: '73501'
    },
    {
        address: '210 WV-956,,Carpendale,WV,26753',
        street: '210 WV-956',
        unit: '',
        city: 'Carpendale',
        state: 'WV',
        zip: '26753'
    },
    {
        address: '2211 W North Temple St,,Salt Lake City,UT,84116',
        street: '2211 W North Temple St',
        unit: '',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '84116'
    },
    {
        address: '5000 S 8400 W,,Magna UT,84044',
        street: '5000 S 8400 W',
        unit: '',
        city: 'Magna',
        state: 'UT',
        zip: '84044'
    }
];

// const rawAddresses = [
//     '291 North St,,Saco,ME,04072',
//     '326 IBM Rd,,Williston,VT,05495',
//     '156 Cedar Ave,,Scranton,PA,18505',
//     '459 Kennedy Dr,,Archibald,PA,18403',
//     '11816 N Creek Pkwy,Suite 100,Bothell,WA,98011',
//     '6658 Rt 148,,Marion,,IL,62959',
//     '200 S Pioneer Blvd,,Springboro,OH,45066',
//     '5000 Chesshire Ln N,,Plymouth,MN,55446',
//     '4300 Industrial Ave,,Lincoln,NE,68504',
//     '6345 AR-203 Highway,,Hampton,AR,71744',
//     '1200 N Glenbrook Dr, Garland,,TX,75040',
//     '1425 Commercial Blvd,,Anniston AL,36207',
//     '7745 Eagle Rd,,Redstone Arsenal,AL,35803',
//     '8900 De Soto Ave,,Canoga Park,CA,91304',
//     '1151 W Reeves Ave,Ridgecrest,CA,93555',
//     '9401 Corbin Ave,,Northridge,CA,91324',
//     '16550 W Bernardo Dr,,San Diego,CA,92127',
//     '7499 Pine Stake Rd,,Culpeper,VA,22701',
//     '1250 E Aero Park Blvd,,Tucson,AZ,85756',
//     '1 SW 11th St,Suite 290,Lawton,OK,73501',
//     '210 WV-956,,Carpendale,WV,26753',
//     '2211 W North Temple St,,Salt Lake City,UT,84116',
//     '5000 S 8400 W,,Magna UT,84044'
// ];

module.exports = addresses;