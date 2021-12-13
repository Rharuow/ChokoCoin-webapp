import { IUserHome } from "./home/IUserHome";
import { ICurrentUser } from "./IUser";

export interface IAuthorization {
  status: boolean;
  user:  IUserHome | null;
}
