type serialized_errors = {
	message: string
	field?: string
}[]

export abstract class CustomError extends Error {
	abstract readonly status_code: number
	abstract serialize(): serialized_errors

	constructor(message: string) {
		super(message)
	}
}
