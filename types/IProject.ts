import { IPartner } from "./IPartner";

export interface IProject {
  id: string;
  name: string;
  value: string;
  partners: Array<IPartner>;
}
