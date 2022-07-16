// This is the entry point for the application
const express = require("express");
const app = express();

var Myo = require("myo");
const ws = require("ws");

const MyoController = require("./controllers/myoController");
const ServerController = require("./controllers/serverController");

// Myo
Myo.connect("com.stolksdorf.myAwesomeApp", ws);

Myo.on("connected", function () {
	this.streamEMG(true);
	MyoController.CONNECT();
});

Myo.on("emg", (data) => {
	MyoController.EMG(data);
});

// Routes and gets
app.get("/strength", ServerController.getStrength(MyoController));

app.listen(8000, () => {
	console.log("running");
});
