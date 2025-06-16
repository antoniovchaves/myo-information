const { getStrength } = require("../util/info");
const myoController = require("./myoController");

class ServerController {
	constructor() {}

	/**
	 * Get current Myo's strength
	 * @param {*} myo - Myo instance
	 */
	getMyoStrength(myo) {
		return (req, res) => {
			// Get all needed information to evaluate the response
			const { connected, stream } = myo.info;

			// Verify if Myo device and Myo Connect software are connected to the server
			if (!connected)
				res.status(400).send({
					meta: { success: false },
					error: {
						message:
							"Connection failed, please verify if Myo is connected.",
					},
				});

			// Calculate strength used for the last 5s
			const strength = getStrength(stream);
			console.log("strength:", strength)

			// Send response to client
			return res.status(200).send({
				meta: { success: true },
				data: { strength },
			});
		};
	}

	getMyoArmSynced(myo) {
		return (req, res) => {
			// Get all needed information to evaluate the response
			const { connected, stream } = myo.info;

			// Verify if Myo device and Myo Connect software are connected to the server
			if (!connected)
				res.status(400).send({
					meta: { success: false },
					error: {
						message:
							"Connection failed, please verify if Myo is connected.",
					},
				});

			const arm = myoController._arm;

			// Send response to client
			return res.status(200).send({
				meta: { success: true },
				data: { arm },
			});
		};
	}
}

module.exports = new ServerController();
