import { Role, Link, Location } from "../../shared";

export interface UserParams {
  id: string;
}

export interface UserResponse {
  role: Role;
  phone: string;
  email: string;
  links?: Link[];
  avatar?: string;
  full_name: string;
  biography: string;
  location: Location;
}
