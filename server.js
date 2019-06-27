const express = require("express");
const helmet = require("helmet");
const schipholRunways = require("schiphol-runways");

const PORT = process.env.PORT || 8000;
const REFRESH_TIME = 300000;

let runways;

getRunwayData();

setInterval(() => {
  debug("Fetching runway status");

  getRunwayData();
}, REFRESH_TIME);

const app = express();
app.use(helmet());

app.get("*", (req, res) => {
  if (!runways) {
    getRunwayData()
      .then(runwayData => {
        res.json(runwayData);
      })
      .catch(err => {
        throw err;
      });
  } else {
    res.json(runways);
  }
});

module.exports = app;

function getRunwayData() {
  return schipholRunways().then(runwayData => {
    runways = runwayData;

    return runways;
  });
}

function debug() {
  console.log("DEBUG: ", ...arguments);
}
