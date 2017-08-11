const express = require('express');
const helmet = require('helmet');
const schipholRunways = require('schiphol-runways');

const PORT = process.env.PORT || 8000;

let runways;

getRunwayData();

setInterval(() => {
    debug('Fetching runway status');

    getRunwayData();
}, 30000);

const app = express();
app.use(helmet());

app.get('/runways', (req, res) => {
    if (!runways) {
        getRunwayData().then((runwayData) => res.json(runwayData));
    } else {
        res.json(runways);
    }
});

app.listen(PORT, () => {
    debug(`Schiphol Runways Server running on port ${PORT}`);
});

function getRunwayData() {
    return schipholRunways().then((runwayData) => {
        runways = runwayData;
    });
}

function debug() {
    console.log('DEBUG: ', ...arguments);
}
