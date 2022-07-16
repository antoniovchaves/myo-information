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

	_streamPush(item) {
		const stream = this._stream;
		stream.push(item);
		return stream;
	}

	_streamChange(item) {
		const stream = this._stream;
		stream[this._currentPush] = item;
		return stream;
	}
	CONNECT() {
		this._connected = true;
		console.log("Connected");
	}

	EMG(data) {
		// 200 values per second, so 1000 values equals 1 seconds
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
