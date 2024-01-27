import React, { useEffect, useState } from "react";
import SeccionBlack from "../seccionBlack";
import { getClientBuildManifest } from "next/dist/client/route-loader";
import { getListClienteContento } from "@/services/clienteContento/clienteContentoService";
import Slider from "react-slick";
import { IComments } from "@/Models/IComments";
import axios, { AxiosResponse } from "axios";
import { Person } from "@mui/icons-material";

interface props {
  calificacion: any;
}
const CalificacionEstrellitas = ({ calificacion }: props) => {
  const renderEstrellas = () => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <span
          key={i}
          className={`cursor-pointer ${i <= calificacion ? "text-yellow-500" : "text-gray-300"
            }`}
        >
          ★
        </span>
      );
    }
    return estrellas;
  };

  return <div>{renderEstrellas()}</div>;
};

function ClientesContentos() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [comments, setComments] = useState<IComments[]>();

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const info = await obtenerInformacion();
    const info2 = info.map((state: IComments) => {
      return { ...state, qualification: 4 };
    });
    setComments(info2);
  };

  const obtenerInformacion = async (): Promise<IComments[]> => {
    try {
      const url = process.env.base_url;
      const response: AxiosResponse<IComments[]> = await axios.get(
        `${url}comentarios`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  return (
    <div>
      <SeccionBlack
        titulo={"Clientes contentos"}
        descripcion={
          "Estos son algunos testimonios sobre la Experiencia Yaghan."
        }
      ></SeccionBlack>
      <div className="bg-white text-center text-black h-80 flex flex-col justify-center pr-7 pl-7 pt-6">
        <Slider {...settings}>
          {comments?.map((x) => (
            <div key={x.id} className="flex-column text-black ">
              <div>
                <span className="font-bold">
                  <span className="quote-sign-start mr-2 text-18 font-georgia font-bold ">“</span>
                  {x.description}
                  <span className="quote-sign-start ml-2 text-18 font-georgia font-bold ">“</span>
                </span>
              </div>
              <div>
                <i className="fa fa-user"></i>
                <div className="flex justify-center">
                  <Person
                    style={{ color: "black", marginRight: "10px", marginTop: "8px"}}
                    fontSize="small"
                  />{" "}
                  <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#222", fontWeight: "700", marginTop: "12px" }}> {x.name} </p>
                </div>
              </div>
              <CalificacionEstrellitas calificacion={5} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ClientesContentos;
