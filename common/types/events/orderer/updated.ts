import { Event } from 'common/types/events/event'
import { Subjects } from 'common/types/events/subjects'

export type OrdererUpdatedEvent = Event<Subjects.OrdererUpdated, { id: string; name: string; password: string }>