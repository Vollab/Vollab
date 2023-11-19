import { IProfileResponse } from "../profile";

import { UserResponse } from "../user";

export interface SignUpRequest extends Omit<IProfileResponse, "id"> {}

export interface SignUpResponse extends UserResponse {}
