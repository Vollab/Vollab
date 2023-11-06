import { CustomError } from './custom'

export class ConflictError extends CustomError {
	status_code = 423

	constructor(message?: string) {
		super(message || 'Conflict')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
