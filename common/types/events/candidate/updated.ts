import { Event } from 'common/types/events/event'
import { Subjects } from 'common/types/events/subjects'

export type CandidateUpdatedEvent = Event<Subjects.CandidateUpdated, { id: string; name: string; biography: string; updated_at: Date }>
