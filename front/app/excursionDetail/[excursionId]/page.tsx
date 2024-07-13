"use client";
import { IExcurcion } from "@/Models/IExcursion";
// import { Carousel } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IImagesExcursion } from "@/Models/IImagesExcursion";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CallMadeIcon from '@mui/icons-material/CallMade';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import { ReserveForm } from "@/components/Reserva/ReserveForm";
import Slider from "react-slick";

export default function ExcursionDetail({
  params,
}: {
  params: { excursionId: number };
}) {
  interface IImageRender {
    src: string,
    aspect_ratio: number
  }
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
    console.log(imagesList);
    
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

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000, // Velocidad del autoplay en milisegundos
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <h1
        style={{
          color: "#ffaa00",
          fontSize: "50px",
          lineHeight: "82px",
          fontWeight: "700",
          fontFamily: "serif",
        }}
        className="excursion-title text-center"
      >
        {excursionSelected && excursionSelected.name.toUpperCase()}
      </h1>

      <div className="images-grid mx-auto">
        {images && images.map((image, index) => (
          <div key={index} className="image-item">
            <Image
              src={image.src}
              alt={`Excursion image ${index + 1}`}
              width={800}
              height={450}
              className="image"
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-lg leading-relaxed tracking-wide text-justify">
          {excursionSelected && excursionSelected.description}
        </p>
      </div>

      {excursionSelected && (
        <div className="p-12 flex flex-wrap justify-around">
          <div className="flex flex-col items-center p-2">
            <WarningAmberIcon />
            <p>DIFICULTAD</p>
            {excursionSelected.difficulty}
          </div>

          <div className="flex flex-col items-center p-2">
            <EditLocationIcon />
            <p>DISTANCIA</p>
            {excursionSelected.distance}
          </div>

          <div className="flex flex-col items-center p-2">
            <CallMadeIcon />
            <p>DESNIVEL</p>
            {excursionSelected.slope}
          </div>

          <div className="flex flex-col items-center p-2">
            <AccessTimeIcon />
            <p>DURACIÓN</p>
            {excursionSelected.duration}
          </div>
        </div>
      )}
      <ReserveForm excursionSelected={excursionSelected} />
    </div>
  );
}
