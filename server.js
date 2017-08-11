const express = require('express');
const schipholRunways = require('schiphol-runways');

const app = express();
const PORT = 8000;

let runways;

getRunwayData();

setInterval(() => {
    debug('Fetching runway status');

    getRunwayData();
}, 30000);

app.get('/runways', (req, res) => {
    if (!runways) {
        getRunwayData().then((runwayData) => res.end(JSON.stringify(runwayData)));
    } else {
        res.end(JSON.stringify(runways));
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
