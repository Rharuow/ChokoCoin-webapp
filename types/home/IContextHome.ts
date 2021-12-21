import { IModal } from "../IModal";
import { IProject } from "../IProject";
import { IUser } from "../IUser";
import { IUserHome } from "./IUserHome";

export interface IContextHome {
  user: IUserHome;
  setUser: React.Dispatch<React.SetStateAction<IUserHome | undefined>>;
  users: Array<IUser> | undefined;
  setUsers: React.Dispatch<React.SetStateAction<IUser[] | undefined>>;
  projects: Array<IProject> | undefined;
  setProjects: React.Dispatch<React.SetStateAction<IProject[] | undefined>>;
  modalIsOpen: IModal;
  setIsOpen: React.Dispatch<React.SetStateAction<IModal>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
