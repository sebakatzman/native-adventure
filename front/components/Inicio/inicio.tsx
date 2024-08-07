"use client";
import { IInicio } from "@/Models/IInicio";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import styles from './Inicio.module.css';

function Inicio() {
  const router = useRouter();
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [inicioObject, setInicioObject] = useState<IInicio[]>();

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    const info = await obtenerInformacion();
    setInicioObject(info);
  };

  const obtenerInformacion = async (): Promise<IInicio[]> => {
    try {
      const urlBase = process.env.base_url;
      const urlCompleta = urlBase + "cards";
      const response: AxiosResponse<IInicio[]> = await axios.get(
        urlCompleta
      );
      const info: IInicio[] = response.data;
      info.sort((a, b) => a.priority - b.priority);
      return info;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = 1 - scrollPosition / 500; // Ajusta este valor según tus necesidades
      setOpacity(newOpacity < 0 ? 0 : newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {inicioObject &&
          inicioObject.map((x) => (
            <div key={x.id} className={`relative ${styles.sliderItem}`} >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <Image src={x.image} layout="fill" objectFit="cover" alt={x.firstTitle || ""} />
              <div className={styles.centerContent}>
                <div className="banner-center-box text-center" style={{ opacity: opacity }}>
                  <h1
                    style={{
                      color: "##ffaa00",
                      fontSize: "calc(3vw + 20px)", // Uso de vw para ajustar el tamaño relativamente
                      lineHeight: "1.2",
                      fontWeight: "700",
                      fontFamily: "serif",
                    }}
                  >
                    {x.firstTitle != null ? x.firstTitle.toUpperCase() : ""}
                  </h1>
                  <br />
                  <h1
                    className="text-4xl md:text-3xl lg:text-2xl xl:text-xl"
                    style={{
                      color: "#ffaa00",
                      fontSize: "calc(3vw + 20px)", // Uso de vw para ajustar el tamaño relativamente
                      lineHeight: "1.2",
                      fontWeight: "700",
                      opacity: 1,
                      fontFamily: "serif",
                    }}
                  >
                    {x.secondTitle != null ? x.secondTitle.toUpperCase() : ""}
                  </h1>
                  <div className="hidden lg:block">
                    <div style={{ color: "#fff", marginBottom: "25px" }}>
                      {x.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default Inicio;
