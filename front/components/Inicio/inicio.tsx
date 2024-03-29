"use client";
import { IInicio } from "@/Models/IInicio";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Divider } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

function Inicio() {
  const router = useRouter();
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    //autoplaySpeed: 2000,
    pauseOnHover: true,
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

  const getButton = (x: IInicio) => {
    const title = x.firstTitle.toUpperCase(); 

    if (title == "E-BIKES" || title == "TREKKING" || title == "CANOAS" ) {
      return (
        <Button size="md"
        color="warning" onClick={() => router.push(`/excursiones`)} >
          Ver Más
        </Button>
      );
    }

  };

  return (
    <div className="pr-7 pl-7">
      <Slider {...settings}>
        {inicioObject &&
          inicioObject.map((x) => (
            <div key={x.id} className="relative">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <Image src={x.image} width={1200} alt="dsa" height={100} style={{ width: "100%" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "10px" }}>
                <div className="banner-center-box text-center" style={{ opacity: opacity }} >
                  <h1
                    style={{
                      color: "##ffaa00",
                      fontSize: "calc(3vw + 20px)", // Uso de vw para ajustar el tamaño relativamente
                      lineHeight: "1.2",
                      fontWeight: "700",
                      fontFamily: "serif",
                    }}
                  >
                    {x.firstTitle.toUpperCase()}
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
                    {x.secondTitle.toUpperCase()}
                  </h1>
                  <Divider className="my-4"></Divider>
                  <div className="hidden lg:block">
                    <div style={{ color: "#fff", marginBottom: "25px" }}>
                      {x.description}
                    </div>
                  </div>

                  {getButton(x)}

                  <Divider className="my-4 color"></Divider>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default Inicio;
