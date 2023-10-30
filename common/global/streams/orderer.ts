import { Stores, Subjects } from 'common/types/events'
import { Stream } from 'common/services/nats'

class OrdererStream extends Stream {
	private static _instance: OrdererStream = new OrdererStream()

	readonly name = Stores.Orderer
	readonly subjects = [Subjects.Orderer]

	static get instance() {
		return this._instance
	}
}

const instance = OrdererStream.instance
export { instance as orderer_stream }
