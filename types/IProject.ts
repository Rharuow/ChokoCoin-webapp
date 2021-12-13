import { IPartner } from "./IPartner";

export interface IProject {
  name: string;
  value: string;
  partners: Array<IPartner>;
}
