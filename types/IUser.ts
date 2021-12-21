import { IProject } from "./IProject";

export interface IUser {
  id: string;
  email: string;
  username: string;
  is_admin: boolean;
  is_active: boolean;
  projects: Array<IProject>;
}
