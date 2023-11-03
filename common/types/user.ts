export interface UserRequest {
	token: string
}

export interface UserResponse {
	token: string
	name: string
	email: string
	phone: string
	avatar?: string
	password: string
	biography: string
	activity_areas: string[]
	links?: { title: string; link: string }[]
}
