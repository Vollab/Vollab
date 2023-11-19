import { Stores, Subjects } from 'common/types/events'
import { Stream } from 'common/services/nats'

class DemandStream extends Stream {
	private static _instance: DemandStream = new DemandStream()

	readonly name = Stores.Demand
	readonly subjects = [Subjects.Demand]

	static get instance() {
		return this._instance
	}
}

const instance = DemandStream.instance
export { instance as demand_stream }
