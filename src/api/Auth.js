'use strict';

/**
 * Class responsible for storing authorization information.
 */
class Auth {
	/**
	 * Constructs an {@link Auth} instance.
	 * @param {string} tokenOrUsername Either the authorization token, or
	 *   the username.
	 * @param {string=} opt_password If a username is given as the first param,
	 *   this should be the password.
	 * @constructor
	 */
	constructor(tokenOrUsername, opt_password = null) {
		this.token_ = (typeof opt_password === 'string') ? null : tokenOrUsername;
		this.username_ = (typeof opt_password === 'string') ? tokenOrUsername : null;
		this.password_ = opt_password;
	}

	/**
	 * Constructs an {@link Auth} instance.
	 * @param {string} tokenOrUsername Either the authorization token, or
	 *   the username.
	 * @param {string=} opt_password If a username is given as the first param,
	 *   this should be the password.
	 * @return {!Auth}
	 */
	static create(tokenOrUsername, opt_password) {
		return new Auth(tokenOrUsername, opt_password);
	}

	/**
	 * Checks if the password is set.
	 * @return {boolean}
	 */
	hasPassword() {
		return this.password_ !== null;
	}

	/**
	 * Checks if the token is set.
	 * @return {boolean}
	 */
	hasToken() {
		return this.token_ !== null;
	}

	/**
	 * Checks if the username is set.
	 * @return {boolean}
	 */
	hasUsername() {
		return this.username_ !== null;
	}

	/**
	 * Returns the password.
	 * @return {string}
	 */
	password() {
		return this.password_;
	}

	/**
	 * Returns the token.
	 * @return {string}
	 */
	token() {
		return this.token_;
	}

	/**
	 * Returns the username.
	 * @return {string}
	 */
	username() {
		return this.username_;
	}
}

export default Auth;
