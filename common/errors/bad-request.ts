import { CustomError } from './custom'

export class BadRequestError extends CustomError {
	status_code = 400

	constructor(message?: string) {
		super(message || 'Bad request')
	}

	serialize() {
		return [{ message: this.message }]
	}
}
