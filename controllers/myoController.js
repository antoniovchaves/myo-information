class MyoController {
	constructor() {
		this._stream = [];
		this._passed20 = false;
		this._currentPush = 0;
		this._connected = false;
	}

	get info() {
		return {
			stream: this._stream,
			passed20: this._passed20,
			currentPush: this._currentPush,
			connected: this._connected,
		};
	}

	/** @internal
	 * Clones _stream and push the item to end of cloned stream.
	 * @param {Array} item with values between -100 and 100 each element got from Myo's EMG
	 * @returns Array with pushed values
	 */
	_streamPush(item) {
		const stream = this._stream;
		stream.push(item);
		return stream;
	}

	/** @internal
	 * Clones _stream and rewrite it on to _currentPush index with the item parameter.
	 * @param {Array} item  with values between -100 and 100 each element got from Myo's EMG
	 * @returns Array with changed values
	 */
	_streamChange(item) {
		const stream = this._stream;
		stream[this._currentPush] = item;
		return stream;
	}

	/**
	 * Changes _connected to true and logs
	 */
	CONNECT() {
		this._connected = true;
		console.log("Connected");
	}

	/**
	 * Fill _stream depending on the situation:
	 *  - If full: rewrite Array on _currentPush index position;
	 *  - Else: push new EMG information to _stream
	 *
	 * @param {Array} data with values between -100 and 100 each element got from Myo's EMG
	 */
	EMG(data) {
		// 200 values per second, so 20 values equals 0.1 seconds
		if (this._currentPush > 19) {
			this._currentPush = 0;
			this._passed20 = true;
		}

		if (this._passed20) {
			this._stream = this._streamChange(data);
		} else this._stream = this._streamPush(data);

		this._currentPush++;
	}
}

module.exports = new MyoController();
