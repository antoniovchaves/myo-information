const { getStrength } = require("../util/info");

class ServerController {
	constructor() {}

	getStrength(myo) {
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

			// Send response to client
			return res.status(200).send({
				meta: { success: true },
				data: { strength },
			});
		};
	}
}

module.exports = new ServerController();
