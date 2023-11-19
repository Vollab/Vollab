import { UserResponse } from '../user'

export interface CandidateRequest {
	name: string
	email: string
	phone: string
	avatar?: string
	password: string
	biography: string
	activity_areas: string[]
	links?: { title: string; link: string }[]
}

export type CandidateResponse = UserResponse
