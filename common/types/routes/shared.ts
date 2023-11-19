export type Role = "candidate" | "orderer";
export type VacancyWorkMode = "hybrid" | "remote" | "in_person";
export type ApplicationStatus = "refused" | "pending" | "approved";
export type Orderer = { id: string; name: string; avatar?: string };
export type DemandStatus = "opened" | "in_progress" | "completed" | "canceled";

export interface Link {
  href: string;
  label: string;
}

export interface ErrorResponse {
  message: string;
}

export interface Location {
  city: string;
  state: string;
}
