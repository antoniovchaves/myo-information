// --- serverController.js
const { getStrength } = require("../util/info");

class ServerController {
    static getMyoStrength(myo) {
        return (req, res) => {
            const { connected, stream } = myo.info;
            if (!connected) {
                return res.status(400).json({
                    meta: { success: false },
                    error: "Myo not connected"
                });
            }
            const strength = getStrength(stream);
            res.status(200).json({
                meta: { success: true },
                data: { strength }
            });
        };
    }

    /**
     * Handler combining average-of-top-3 and interaction count
     */
    static getCustomMetric(myo) {
        return (req, res) => {
            const { connected, interactionAverages, interactionCount } =
                myo.info;
            if (!connected) {
                return res.status(400).json({
                    meta: { success: false },
                    error: "Myo not connected"
                });
            }
            // Use the latest interaction average
            const latestAvg =
                interactionAverages[interactionAverages.length - 1] || 0;
            // Example calculation: latest average * total interactions
            const result = latestAvg * interactionCount;
            res.status(200).json({
                meta: { success: true },
                data: { latestAvg, interactionCount, result }
            });
        };
    }

    static getPassiveStrength(myo) {
        return (req, res) => {
            const { connected } = myo.info;
            if (!connected) {
                return res.status(400).json({
                    meta: { success: false },
                    error: "Myo not connected"
                });
            }
            const value = myo.resetPassiveStrength();
            res.status(200).json({
                meta: { success: true },
                data: { passiveStrength: value }
            });
        };
    }
}

module.exports = ServerController;
