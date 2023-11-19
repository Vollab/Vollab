import { Link, Location } from "../shared";

export interface IProfileResponse {
  id: string;
  email: string;
  phone: string;
  links: Link[];
  full_name: string;
  biography: string;
  location: Location;
  activity_areas: string[];
}
