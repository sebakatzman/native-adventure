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
import Image from "next/image";


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
    const sortedSections = filter.sort((a, b) => (a.order || 0) - (b.order || 0));

    setExcursiones(sortedSections);
    setExcursionesFilter(sortedSections);
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
      <div className="pt-4">
      {/* <div className="flex flex-wrap justify-around">
        {excursionesFilter?.map((excursion) => (
          <div key={excursion.id} className="p-4 relative" onClick={() =>
            router.push(`/excursionDetail/${excursion.id}`)
          }>
            <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray-800 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
              <h5 className="text-2xl font-bold text-white">{excursion.name}</h5>
              <Button
                size="md"
                color="warning"
                onClick={() =>
                  router.push(`/excursionDetail/${excursion.id}`)
                }
                className="mt-4"
              >
                VER
              </Button>
            </div>
            <Image
              src={excursion.image}
              width={400}
              height={300}
              alt={excursion.name}
              className="rounded-lg"
            />
          </div>
        ))}
      </div> */}
       <div className="max-w-screen-lg mx-auto p-8">
        <div className="grid grid-cols-1 gap-8">
          {excursionesFilter &&
            excursionesFilter.map((excursion) => (
              <div
                key={excursion.id}
                className="p-4 rounded-lg shadow-md relative text-center"
                onClick={() => router.push(`/excursionDetail/${excursion.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <h1
                  style={{
                    color: "#ffffff", // Color blanco
                    fontSize: "calc(3vw + 20px)",
                    lineHeight: "1.2",
                    fontWeight: "700",
                    fontFamily: "serif",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {excursion.name.toUpperCase()}
                </h1>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray-800 rounded-md"></div>
                  <Image
                    src={excursion.image}
                    width={1200}
                    height={600}
                    alt={excursion.name}
                    className="rounded-md"
                    />
                </div>
              </div>
            ))}
        </div>
      </div>
</div>

</div>

    </div>
  );
}