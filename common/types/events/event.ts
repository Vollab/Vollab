import { Subjects } from './subjects'

export interface Event<S extends Subjects = any, T extends object = any> {
	subject: S
	data: T
}
