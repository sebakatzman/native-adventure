"use client";
import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import { Button } from "@nextui-org/button";
import { Card } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormControl, InputLabel } from "@mui/material";
import { MenuItem, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { IExcurcion } from "@/Models/IExcursion";
import AccessTimeFilledOutlinedIcon from '@mui/icons-material/AccessTimeFilledOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function SectionDetail({
  params,
}: {
  params: { sectionId: number };
}) {
  const router = useRouter();

  const [sectionSelected, setSectionSelected] = useState<ISeccionExcursion>();
  const [excursiones, setExcursiones] = useState<IExcurcion[]>([]);
  const [excursionesFilter, setExcursionesFilter] = useState<IExcurcion[]>([]);

  const getData = async () => {
    const url = process.env.base_url;
    const response = await axios.get<IExcurcion[]>(`${url}excursions`);
    const filter = response.data.filter((x) => x.section == params.sectionId);
    setExcursiones(filter);
    setExcursionesFilter(filter);
    const response2 = await axios.get<ISeccionExcursion[]>(`${url}sections`);
    const filter2 = response2.data.find((ex) => ex.id == params.sectionId);
    setSectionSelected(filter2);
  };

  useEffect(() => {
    getData();
  }, []);

  const [dificultad, setDificultad] = useState("TODAS");

  const handleChange = (e: any) => {
    setDificultad(e.target.value);
  };

  const onFilter = () => {
    if (dificultad == "TODAS") {
      setExcursionesFilter(excursiones);
    } else {
      setExcursionesFilter(
        excursiones.filter((ex) => ex.difficulty == dificultad)
      );
    }
  };

  useEffect(() => {
    if (excursiones?.length > 0) {
      onFilter();
    }
  }, [dificultad]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignContent: "center" }}>
      <div>
        <h1
          style={{
            color: "##ffaa00",
            fontSize: "70px",
            lineHeight: "82px",
            fontWeight: "700",
            fontFamily: "serif",
          }}
        >
          {sectionSelected && sectionSelected.name.toUpperCase()}
        </h1>
      </div>
      <div className="pt-4">
        <FormControl style={{ width: "300px" }}>
          <Select
            defaultSelectedKeys={["TODAS"]}
            label="Dificultad"
            value={dificultad}
            onChange={handleChange}
          >
            <SelectItem key="TODAS" value="TODAS">
              TODAS
            </SelectItem>
            <SelectItem key="BAJA" value="BAJA">
              BAJA
            </SelectItem>
            <SelectItem key="MODERADA" value="MODERADA">
              MODERADA
            </SelectItem>
            <SelectItem key="ALTA" value="ALTA">
              ALTA
            </SelectItem>
          </Select>
        </FormControl>
      </div>
      <div className="pt-4">
        <div className="flex flex-wrap justify-around">
          {excursionesFilter?.map((excursion) => (
            <div key={excursion.id} className={"p-4"}>
              <Card
                className="max-w-sm"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
                imgSrc={excursion.image}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                  {excursion.name}
                </h5>

                <div style={{display: "flex", alignContent: "center", justifyContent: "space-around", alignItems: "center"}}>
                  <div className="flex flex-col items-center p-2 color-black">
                    <AccessTimeFilledOutlinedIcon style={{ color: "black" }}></AccessTimeFilledOutlinedIcon>
                    <p style={{ color: "black" }}> {excursion.duration}</p>
                  </div>

                  <div className="flex flex-col items-center p-2 color-black">
                    <AttachMoneyOutlinedIcon style={{ color: "black" }}></AttachMoneyOutlinedIcon>
                    <p style={{ color: "black" }}>{excursion.price}</p>
                  </div>

                  <div className="flex flex-col items-center p-2">
                    <WarningAmberIcon style={{ color: "black" }} ></WarningAmberIcon>
                    <p style={{ color: "black" }}> {excursion.difficulty} </p>
                  </div>

                </div>

                <div className="flex justify-around pb-2">
                  <Button
                    size="md"
                    color="warning"
                    onClick={() =>
                      router.push(`/excursionDetail/${excursion.id}`)
                    }
                  >
                    DETALLE
                  </Button>
                  <Button size="md" color="warning" onClick={() => router.push(`/reserva/${excursion.id}`)} >
                    RESERVAR
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
