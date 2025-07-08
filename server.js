// --- server.js
const express = require("express");
const app = express();
// Initialize Myo connection and events
var Myo = require("myo");
const ws = require("ws");

const MyoController = require("./controllers/myoController");
const ServerController = require("./controllers/serverController");

Myo.connect("com.stolksdorf.myAwesomeApp", ws);

Myo.on("connected", function () {
    this.streamEMG(true);
    MyoController.CONNECT();
});

Myo.on("emg", function (data) {
    // Forward EMG sample to controller
    MyoController.EMG(data);
});

// Routes
app.get("/strength", ServerController.getMyoStrength(MyoController));
app.get("/customMetric", ServerController.getCustomMetric(MyoController));
app.get(
    "/passive-strength",
    ServerController.getPassiveStrength(MyoController)
);

app.listen(8000, () => console.log("Server running on port 8000"));
