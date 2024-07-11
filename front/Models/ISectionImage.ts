import { ISectionImageDetail } from "./ISectionImageDetail";

export interface ISectionImages{
    id:number;
    title: string;
    sectionImageDetail?: ISectionImageDetail[];
}