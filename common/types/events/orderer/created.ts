import { Event } from 'common/types/events/event'
import { Subjects } from 'common/types/events/subjects'

export type OrdererCreatedEvent = Event<Subjects.OrdererCreated, { id: string; name: string; email: string; created_at: Date; updated_at: Date }>
