const getAverageEMG = (arrayOfEMG) => {
	let sum = 0;
	for (let i = 0; i < arrayOfEMG.length; i++) {
		sum += getHigherEMG(arrayOfEMG[i]);
	}
	const final = Math.round(sum / arrayOfEMG.length);
	return (final / 100).toFixed(1);
};

const getHigherEMG = (emg) => {
	let higher = 0;
	for (let i = 0; i < emg.length; i++) {
		if (0 > emg[i]) {
			if (higher < -emg[i]) higher = -emg[i];
		} else if (higher < emg[i]) higher = emg[i];
	}
	return higher;
};

const getStrength = (arrayOfEMG) => {
	const strength = getAverageEMG(arrayOfEMG) * 1.4;
	return strength > 1 ? strength * 2 : strength;
};

module.exports = { getStrength };
