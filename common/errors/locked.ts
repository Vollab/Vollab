import { CustomError } from './custom'

export class LockedError extends CustomError {
	status_code = 423

	constructor(message?: string) {
		super(message || 'Locked')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
