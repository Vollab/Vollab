import { Location } from "../../shared";

import { Demand, Vacancy as DemandsVacancy } from "..";

export interface DemandParams {
  id: string;
}

export interface Vacancy extends DemandsVacancy {
  open: boolean;
  location?: Location;
  description: string;
}

export interface DemandResponse extends Demand {
  description: string;
  vacancies: Vacancy[];
}
