import {
  DemandStatus,
  VacancyWorkMode,
  ApplicationStatus,
  Orderer,
} from "../shared";

export interface DemandsQueryParams {
  page: number;
}

export interface Vacancy {
  id: string;
  name: string;
  work_mode: VacancyWorkMode;
  status?: ApplicationStatus;
}

export interface Demand {
  id: string;
  title: string;
  resume: string;
  orderer: Orderer;
  status: DemandStatus;
  vacancies: Vacancy[];
}

export type DemandsResponse = Demand[];
