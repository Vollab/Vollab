import { Event } from 'common/types/events/event'
import { Subjects } from 'common/types/events/subjects'

export type CandidateAreaDeletedEvent = Event<Subjects.CandidateAreaDeleted, { candidate_id: string; activity_area_id: string }>
