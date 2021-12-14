import { IProject } from "../IProject";
import { IUserHome } from "./IUserHome";

export interface IContextHome {
  user: IUserHome;
  setUser: React.Dispatch<React.SetStateAction<IUserHome | undefined>>;
  projects: Array<IProject> | undefined;
  setProjects: React.Dispatch<React.SetStateAction<IProject[] | undefined>>;
  modalIsOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
