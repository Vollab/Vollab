import { Subjects } from 'common/types/events/subjects'
import { Event } from 'common/types/events/event'

export type DemandDeletedEvent = Event<Subjects.DemandDeleted, { id: string }>
