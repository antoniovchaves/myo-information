// --- info.js
/**
 * Returns the highest absolute value in one EMG sample (array of numbers).
 */
function getHigherEMG(sample) {
	return Math.max(...sample.map((v) => Math.abs(v)));
}

/**
 * Computes a normalized average of the max absolute values across an array of EMG samples.
 */
function getAverageEMG(samples) {
	const total = samples.reduce((sum, s) => sum + getHigherEMG(s), 0);
	const avg = total / samples.length;
	return avg / 255; // assuming 8-bit amplitude range
}

/**
 * Computes a 'strength' metric from EMG stream: scales average and applies gain.
 */
function getStrength(samples) {
	const normalized = getAverageEMG(samples) * 1.4;
	return normalized > 1 ? normalized * 2 : normalized;
}

module.exports = { getHigherEMG, getAverageEMG, getStrength };
