import { CustomError } from './custom'

export class UnauthorizedError extends CustomError {
	status_code = 403

	constructor(message?: string) {
		super(message || 'Unauthorized')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
