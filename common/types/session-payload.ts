import { JwtPayload } from "jsonwebtoken";

type RemoveIndex<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};

export type UserType = "customer" | "company";

export interface AccessTokenPayload extends RemoveIndex<JwtPayload> {
  user_id: string;
  user_type: UserType;
}

export interface RefreshTokenPayload extends RemoveIndex<JwtPayload> {
  user_id: string;
  user_type: UserType;
  session_id: string;
  session_number: number;
}
