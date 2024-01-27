import { IDetailSection } from "./IDetailSection";
import { IExcurcion } from "./IExcursion";
import { IItem } from "./IItem";

export interface ISeccionExcursion {
  id: number;
  name: string;
  icon: string;
  image: string;
  has_excursions: boolean;
  excursions?: IExcurcion[];
  detailSections?: IDetailSection[];
}
