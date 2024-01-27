"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import SeccionBlack from "../seccionBlack";
import Link from "next/link";
import { RenderIconExcursion } from "./RenderIconExcursion";
import Slider from "react-slick";
import { IComments } from "@/Models/IComments";
import axios, { AxiosResponse } from "axios";
import { Checkbox } from "@nextui-org/react";
import { IExcurcion } from "@/Models/IExcursion";
import { Button } from "@nextui-org/button";
import { env } from "process";
import { IDetailSection } from "@/Models/IDetailSection";
import { IItems } from "@/Models/IItems";
import { log } from "console";

const description =
  "Nos motiva diseñar y crear excursiones que resulten imborrables. Te " +
  "mostramos la mejor versión del fin del mundo y " +
  "Tierra del Fuego. Viví la Experiencia Yaghan.";

function Excursiones() {

  const [seccionExcursionList, setSeccionExcursionList] = useState<ISeccionExcursion[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(1);
  const [infoExcursionSelected, setInfoExcursionSelected] =
    useState<ISeccionExcursion>();

  const onInit = async () => {
    const sections = await getSections();
    const sectionsWithDetail = await getDetailsOfSections(sections);
    setSeccionExcursionList(sectionsWithDetail);
  }

  const getSections = async (): Promise<ISeccionExcursion[]> => {
    try {
      const urlCompleta = process.env.base_url + "sections";
      const response: AxiosResponse<ISeccionExcursion[]> = await axios.get(
        urlCompleta
      );
      const info: ISeccionExcursion[] = response.data;
      return info;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  const getDetailsOfSections = async (sections: ISeccionExcursion[]) => {
    let details: IDetailSection[] = [];
    const newSections: ISeccionExcursion[] = [];

    for (let index = 0; index < sections.length; index++) {
      const section = sections[index];
      details = await getDetailsBySectionId(section.id);
      newSections.push({
        ...section, detailSections: details
      })

    }
    return newSections;
  }

  const getDetailsBySectionId = async (sectionId: number) => {
    try {
      const urlCompleta = process.env.base_url + "detail-sections";
      const response: AxiosResponse<IDetailSection[]> = await axios.get(
        urlCompleta
      );
      let listDetailSection: IDetailSection[] = response.data;
      listDetailSection = listDetailSection.filter(x => x.section == sectionId);
      const listDetailSectionWithItems = getItemsOfDetailSections(listDetailSection);
      return listDetailSectionWithItems;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  }

  const getItemsOfDetailSections = async (listDetailSection: IDetailSection[]) => {

    let newDetailSections: IDetailSection[] = [];

    for (let index = 0; index < listDetailSection.length; index++) {
      const detailSection: IDetailSection = listDetailSection[index];

      const items: IItems[] = await getItemsByDetailSectionId(detailSection.id);
      newDetailSections.push({
        ...detailSection, items: items
      })

    }
    return newDetailSections;

  }

  const getItemsByDetailSectionId = async (detailSectionId?: number) => {
    try {
      const urlCompleta = process.env.base_url + "items";
      const response: AxiosResponse<IItems[]> = await axios.get(
        urlCompleta
      );

      let listItems: IItems[] = response.data;
      listItems = listItems.filter(x => x.detail_section == detailSectionId);
      return listItems;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  }

  useEffect(() => {
    onInit();
  }, []);

  const handleItemClick = (id: number) => {
    const dataSelected = seccionExcursionList.find((x) => x.id == id);
    setInfoExcursionSelected(dataSelected);
  };

  return (
    <div>
      <div className="text-center m-auto mx-16 flex justify-center">
        <div className="max-w-xl">
          <SeccionBlack
            titulo={"Excursiones"}
            descripcion={description}
          ></SeccionBlack>
        </div>
      </div>
      <div
        className="py-8 bg-white content-center"
        style={{
          width: "100%",
          padding: "50px 0 80px",
          marginTop: "30px",
          position: "relative",
          clear: "both",
        }}
      >
        <div
          className="bg-white text-center flex flex-col justify-around container md:w-5/6"
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <div className="flex justify-evenly items-center text-black flex-wrap ">
            {seccionExcursionList != null &&
              seccionExcursionList.map((x) => (
                <div key={x.id} className="mx-8">
                  <RenderIconExcursion
                    activeTab={activeTab}
                    setState={setActiveTab}
                    seccionExcursion={x}
                    handleItemClick={handleItemClick}
                  ></RenderIconExcursion>
                </div>
              ))}
          </div>
          <div className="md:grid md:grid-cols-3 items-center  justify-items-center flex flex-col">
            {/* <div className="flex flex-col"> */}
            {infoExcursionSelected?.detailSections?.map((element) => (
              <div
                className="text-black pr-10 flex flex-col items-start col-span-2 pl-5 pt-4"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
                key={element.id}
              >
                <div>
                  <h1
                    style={{
                      fontSize: "17px",
                      color: "222",
                      fontWeight: 700,
                      lineHeight: 1.4,
                    }}
                  >
                    {element.title}
                  </h1>
                </div>

                <div className="pt-4">
                  <h1 style={{ color: "#777", textAlign: "left" }}>
                    {" "}
                    {element.description}{" "}
                  </h1>
                </div>

                {element.items.map((item) => (
                  <div key={item.id} className="flex pt-4">
                    <div>
                      <Checkbox
                        defaultSelected
                        isSelected
                        color="warning"
                      ></Checkbox>
                    </div>
                    <div>
                      <h1> {item.name} </h1>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="md:w-1/2 md:mt-0 mt-4 col-start-3 row-start-1 ">
              <div className="flex items-center justify-center">
                {infoExcursionSelected && (
                  <div className="border border-gray-400 p-3 min-w-80">
                    <Image
                      src={infoExcursionSelected.image}
                      width={400}
                      height={100}
                      alt="dsa"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Excursiones;
