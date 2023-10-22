import { Pool, PoolConfig, types, QueryConfig } from 'pg'

import { logger } from 'common/services'

types.setTypeParser(types.builtins.INT8, value => parseInt(value, 10))

class Database {
	private static _instance: Database = new Database()
	private _client?: Pool

	private constructor() {}

	static get instance(): Database {
		return Database._instance
	}

	async connect(config: PoolConfig) {
		logger.info(`${logger.BRIGHT('Database:')} Connecting`)
		this._client = new Pool(config)
		logger.info(`${logger.BRIGHT('Database:')} Connected`)

		process.on('exit', async () => {
			logger.info(`${logger.BRIGHT('Database:')} Closing`)
			await this._client?.end()
			logger.info(`${logger.BRIGHT('Database:')} Closed`)
		})
	}

	async query<T extends {}>(query_config: QueryConfig): Promise<T[]>
	async query<T extends {}>(sql: string, values?: any[]): Promise<T[]>
	async query<T extends {}>(arg1: unknown, arg2?: unknown) {
		if (!this._client) throw new Error('Can not access DB before connecting')

		const query_config: QueryConfig =
			typeof arg1 === 'string' && (Array.isArray(arg2) || typeof arg2 == 'undefined') ? { text: arg1, values: arg2 } : (arg1 as QueryConfig)

		const start = Date.now()
		const result = await this._client.query<T>(query_config)
		const duration = Date.now() - start
		const query = query_config.text.replace(/\t+(?![^A-Z;\t])|\t/g, '  ')

		logger.debug(`\n${logger.BLUE('Query')}: ${query}\n${logger.BLUE('Duration')}: ${duration} ms\n${logger.BLUE('Rows')}: ${result.rowCount}`)

		return result.rows
	}
}

const instance = Database.instance
export { instance as database }

// async insert(data: T[] | T) {
// 	const parsed_data = Array.isArray(data) ? data : [data]
// 	const keys = Object.keys(parsed_data[0])
// 	const value_keys: string[] = []
// 	const values: any[] = []

// 	for (let i = 0; i < parsed_data.length; i++) {
// 		for (let j = 0; j < keys.length; j++) values.push(parsed_data[i][keys[j]])

// 		value_keys.push(`(${keys.map((_, j) => `$${1 + j + i * keys.length}`).join(', ')})`)
// 	}

// 	const query: QueryConfig = {
// 		text: `
// 			INSERT INTO
// 				${this.table_name} (${keys.join(', ')})
// 			VALUES
// 				${value_keys.join(', ')}
// 			RETURNING
// 				*
// 			;`,
// 		values
// 	}

// 	logger.debug(JSON.stringify(query).replace(/\\t/g, '').replace(/\\n/g, ' '))
// }
