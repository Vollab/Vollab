import { CustomError } from './custom'

export class UnauthenticatedError extends CustomError {
	status_code = 401

	constructor(message?: string) {
		super(message || 'Unauthenticated')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
