import { IInicio } from "@/Models/IInicio";

const datosReturn: IClienteContento[] = [
  {
    id: 1,
    nombre: "Paola Garcia",
    descripcion: "Estamos muy contentos por ir, la pasamos de maravilla",
  },
  {
    id: 2,
    nombre: "Cristian melo",
    descripcion: "La pasamos excelente, muy reocmendado",
  },
];

export const getListClienteContento = (): IClienteContento[] => {
  return datosReturn;
};
