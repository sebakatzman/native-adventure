import { IExcurcion } from "@/Models/IExcursion";
import { IReserve } from "@/Models/IReserve";
import { Typography } from "@mui/joy";
import { Input } from "@nextui-org/input";
import axios, { AxiosResponse } from "axios";
import React, { useState, useEffect } from "react";
interface props {
  reserve: IReserve;
  handleChange: any;
  setDisabled: any;
  excursionId: number;
}
export const Step3 = ({ reserve, handleChange, setDisabled, excursionId }: props) => {
  const [error, setError] = useState(false);
  const [excursion, setExcursion] = useState<IExcurcion>();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const selectedDate = new Date(value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      setError(true);
      return;
    }
    setError(false);
    handleChange(e);
  };

  useEffect(() => {
    if (reserve.reservation_date)
      setDisabled(false)
    else setDisabled(true);
  }, [reserve.reservation_date]);

  useEffect(() => {
    onInit();
  }, [])

  const getExcursion = async (): Promise<IExcurcion | null> => {
    try {
      const urlCompleta = process.env.base_url + "excursions";
      const response: AxiosResponse<IExcurcion[]> = await axios.get(
        urlCompleta
      );
      console.log(response);
      const info: IExcurcion[] = response.data;
      const objectReturn: IExcurcion | null = info.find(x => x.id == excursionId) ?? null;
      return objectReturn;

    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  const onInit = async () => {
    const data = await getExcursion();
    if (data)
      setExcursion(data);
  }


  return (
    <div>
      <h1 style={{ fontSize: "50px" }}>NATIVE ADVENTURE </h1>
      <h1 style={{ fontSize: "30px" }}>
        Registro de actividad y Seguro - Insurance Activity´s form.
      </h1>
      <h2 style={{ fontSize: "40px" }}>
        Detalles de la actividad | Activity details{" "}
      </h2>
      <h1>Fecha de reserva | Reservation date</h1>
      <Input
        type="date"
        name="reservation_date"
        value={reserve.reservation_date?.toString()}
        onChange={handleDateChange}
      />
      {error && (
        <p style={{ color: "#dc3545", marginTop: "5px", fontSize: "0.9em" }}>
          La fecha de reserva debe ser igual o posterior a hoy.
        </p>
      )}
      <h1 style={{ fontSize: "50px", alignItems: "center" }}>{excursion && excursion.name}</h1>
    </div>
  );
};
