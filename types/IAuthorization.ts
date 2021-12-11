import { ICurrentUser } from "./IUser";

export interface IAuthorization {
  status: boolean;
  user: ICurrentUser | null;
}
