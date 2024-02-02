import { IImagesExcursion } from "./IImagesExcursion";
import { ISeccionExcursion } from "./ISeccionExcursion";

export interface IExcurcion {
  id: number;
  name: string;
  avaliable: boolean //disponible
  duration: string;
  quantityPeople: number;
  price: string;
  image: string;
  description: string;
  difficulty: string;
  distance: string;
  slope: string;
  section: number;
  imagesExcursion?: IImagesExcursion[];
  order: number;
}
