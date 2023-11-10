import { DemandStatus } from 'common/types/demand-status'
import { Subjects } from 'common/types/events/subjects'
import { Event } from 'common/types/events/event'

export type DemandCreatedEvent = Event<Subjects.DemandCreated, { id: string; orderer_id: string; status: DemandStatus }>
