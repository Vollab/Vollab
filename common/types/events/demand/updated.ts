import { DemandStatus } from 'common/types/demand-status'
import { Subjects } from 'common/types/events/subjects'
import { Event } from 'common/types/events/event'

export type DemandUpdatedEvent = Event<Subjects.DemandUpdated, { id: string; status: DemandStatus; updated_at: Date }>
