'use strict';

/**
 * Provides a factory for data transport.
 */
class TransportFactory {
	constructor() {
		this.transports = {};
		this.transports[TransportFactory.DEFAULT_TRANSPORT_NAME] = TransportFactory[TransportFactory.DEFAULT_TRANSPORT_NAME];
	}

	/**
	 * Returns {@link TransportFactory} instance.
	 */
	static instance() {
		if (!TransportFactory.instance_) {
			TransportFactory.instance_ = new TransportFactory();
		}
		return TransportFactory.instance_;
	}

	/**
	 * Gets an instance of the transport implementation with the given name.
	 * @param {string} implementationName
	 * @return {!Transport}
	 */
	get(implementationName) {
		var TransportClass = this.transports[implementationName];

		if (!TransportClass) {
			throw new Error('Invalid transport name: ' + implementationName);
		}

		try {
			return new (TransportClass)();
		} catch (err) {
			throw new Error('Can\'t create transport', err);
		}
	}

	/**
	 * Returns the default transport implementation.
	 * @return {!Transport}
	 */
	getDefault() {
		return this.get(TransportFactory.DEFAULT_TRANSPORT_NAME);
	}
}

TransportFactory.DEFAULT_TRANSPORT_NAME = 'default';

export default TransportFactory;
