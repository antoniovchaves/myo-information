// --- myoController.js
// const { getHigherEMG } = require("./info");

class MyoController {
    constructor() {
        this._stream = [];
        this._currentPush = 0;
        this._passed20 = false;
        this._connected = false;
        this._passiveStrength = 0;
        // count interactions and store per-interaction averages
        this.interactionCount = 0;
        this.interactionAverages = [];
    }

    CONNECT() {
        this._connected = true;
        console.log("Connected");
    }

    EMG(data) {
        // Increment interaction counter
        this.interactionCount++;

        // Compute average of top 3 absolute EMG values for this interaction
        const absValues = data.map((v) => Math.abs(v));
        absValues.sort((a, b) => b - a);
        const top3 = absValues.slice(0, 3);
        const avgTop3 = top3.reduce((sum, v) => sum + v, 0) / top3.length;
        this.interactionAverages.push(avgTop3);

        // Calculate average of data and add (average / 200) to _passiveStrength
        const avgData = data.reduce((sum, v) => sum + v, 0) / data.length;
        this._passiveStrength += avgData / 200;

        // Existing circular-buffer logic
        if (this._passed20) {
            this._streamChange(data);
        } else {
            this._streamPush(data);
            if (this._stream.length === 20) {
                this._passed20 = true;
            }
        }
        this._currentPush = (this._currentPush + 1) % 20;
    }

    resetPassiveStrength() {
        const prev = this._passiveStrength;
        this._passiveStrength = 0;
        return prev;
    }

    /** Expose internal state plus new metrics */
    get info() {
        return {
            stream: this._stream,
            passed20: this._passed20,
            currentPush: this._currentPush,
            connected: this._connected,
            interactionCount: this.interactionCount,
            interactionAverages: this.interactionAverages,
            passiveStrength: this._passiveStrength
        };
    }
}

module.exports = new MyoController();
