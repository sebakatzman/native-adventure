import { IItems } from "./IItems";

export interface IDetailSection {
  id?: number;
  title: string;
  description: string;
  items: IItems[];
  section?: number;
}
