import { UserResponse } from "../user";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse extends UserResponse {}
