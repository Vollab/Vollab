import { CustomError } from './custom'

export class NotFoundError extends CustomError {
	status_code = 404

	constructor(message?: string) {
		super(message || 'Not found')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
