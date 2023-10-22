export const checkEnv = (...keys: string[]) => {
	const messages: string[] = []

	for (const key of keys) {
		if (!process.env[key]) messages.push(`${key} must be defined`)
	}

	if (messages.length != 0) throw new Error(messages.join('\n'))
}
