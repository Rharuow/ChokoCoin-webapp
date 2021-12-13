import { IPartner } from "./IPartner";

export interface IProject {
    name: string;
    value: number;
    partners: Array<IPartner>;
  }