import { MulterError } from 'multer'
import { CustomError } from './custom'

export class UploadError extends CustomError {
	status_code = 400

	constructor(private error: MulterError) {
		super('Invalid file')
	}

	serialize() {
		return [{ message: this.error.message, field: this.error.field }]
	}
}
