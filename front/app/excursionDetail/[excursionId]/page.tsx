"use client";
import { IExcurcion } from "@/Models/IExcursion";
import { Button } from "@nextui-org/button";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Gallery } from "next-gallery";
import axios, { AxiosResponse } from "axios";
import { IImagesExcursion } from "@/Models/IImagesExcursion";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CallMadeIcon from '@mui/icons-material/CallMade';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { ReserveForm } from "@/components/Reserva/ReserveForm";

export default function ExcursionDetail({
  params,
}: {
  params: { excursionId: number };
}) {
  const router = useRouter();
  const [excursionSelected, setExcursionSelected] = useState<IExcurcion>();
  const [images, setImages] = useState<IImageRender[]>([]);

  const getExcursion = async (): Promise<IExcurcion | null> => {
    try {
      const urlCompleta = process.env.base_url + "excursions";
      const response: AxiosResponse<IExcurcion[]> = await axios.get(urlCompleta);
      const info: IExcurcion[] = response.data;
      const elemReturn: IExcurcion | null = info.find(x => x.id == params.excursionId) ?? null;
      return elemReturn;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  const getData = async () => {
    let informacion = await getExcursion();
    if (informacion) {
      setExcursionSelected(informacion);
      resolveImages(informacion);
    }
  }

  interface IImageRender {
    src: string,
    aspect_ratio: number
  }

  const resolveImages = async (excursion: IExcurcion) => {
    let images;
    images = await getImages();

    if (!images)
      return false;

    const imagesList: IImageRender[] = [];
    for (let index = 0; index < images?.length; index++) {
      const imageExcursion = images[index];
      imagesList.push({
        src: imageExcursion.image,
        aspect_ratio: 16 / 9
      })
    }
    setImages(imagesList)
  }

  const getImages = async () => {
    try {
      const urlCompleta = process.env.base_url + "images-excursions";
      const response: AxiosResponse<IImagesExcursion[]> = await axios.get(urlCompleta);
      const info: IImagesExcursion[] = response.data;

      const elemReturn: IImagesExcursion[] | null = info.filter(x => x.excursion == params.excursionId) ?? null;
      return elemReturn;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const reservar = () => {
    router.push('/reserva/' + params.excursionId);
  }

  return (
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
        {excursionSelected && excursionSelected.name.toUpperCase()}
      </h1>

      <div className="h-56 sm:h-64 xl:h-100 2xl:h-96">
        {images && images.length > 0 &&
          <Carousel>
            {images && images.length > 0 &&
              images.map((imageEx) => (
                <Image
                  key={imageEx.src}
                  src={imageEx.src}
                  width={1200}
                  alt="dsa"
                  height={800}
                  style={{ width: "100%", height: "auto" }}
                />
              ))}
          </Carousel>
        }
      </div>
      <div className="mt-8">
        <p className="text-lg leading-relaxed tracking-wide text-justify">
          {excursionSelected && excursionSelected.description}
        </p>
      </div>
      <h1
        style={{
          color: "#ffaa00",
          fontSize: "70px",
          lineHeight: "82px",
          fontWeight: "700",
          fontFamily: "serif",
          paddingTop: "30px"
        }}
      >
        FICHA TECNICA
      </h1>

      {excursionSelected && (
        <div
          className="p-12"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingInline: "40px"
          }}
        >

          <div className="flex flex-col items-center p-2">
            <WarningAmberIcon></WarningAmberIcon>
            <p>DIFICULTAD</p>
            {excursionSelected.difficulty}
          </div>

          <div className="flex flex-col items-center p-2">
            <EditLocationIcon></EditLocationIcon>
            <p>DISTANCIA</p>
            {excursionSelected.distance}
          </div>

          <div className="flex flex-col items-center p-2">
            <CallMadeIcon></CallMadeIcon>
            <p>DESNIVEL</p>
            {excursionSelected.slope}
          </div>

          <div className="flex flex-col items-center p-2">
            <AccessTimeIcon></AccessTimeIcon>
            <p>DURACIÒN</p>
            {excursionSelected.duration}
          </div>

        </div>
      )}
      <ReserveForm excursionSelected={excursionSelected}></ReserveForm>
      {/* <div className="items-center py-8">
          <Button color="warning" fullWidth onClick={reservar} >RESERVAR</Button>
      </div> */}

      <div>
        <div className="flex flex-col gap-10">
          <Gallery
            widths={[1000, 2000, 1600]}
            ratios={[2.2, 4, 6, 8]}
            images={images}
            lastRowBehavior="match-previous"
          />
        </div>
      </div>
    </div>
  );
}
