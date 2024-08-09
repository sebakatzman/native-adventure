import { ISeccionExcursion } from "./ISeccionExcursion";
import { ISeccionItemExcursion } from "./ISeccionItemExcursion";

export interface ISeccionExcursionSeccionItemExcursion {
  id: number;
  seccionExcursionId: number;
  seccionItemExcursionId: number;
  seccionExcursion?: ISeccionExcursion;
  seccionItemExcurison?: ISeccionItemExcursion;
}
