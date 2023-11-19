import { Role } from "../shared";

export interface UserResponse {
  id: string;
  role: Role;
  token: string;
  avatar: string;
  full_name: string;
}
