import axios, { AxiosResponse } from "axios";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { title } from "../primitives";
import SeccionBlack from "../seccionBlack";
import { AccessTime, Email, LocalPhone, Place } from "@mui/icons-material";

function Contacto() {
  const [contact, setContact] = useState<IContacts>();

  useEffect(() => {
    getContacs();
  }, []);

  const getContacs = async () => {
    const info = await obtenerInformacion();
    setContact(info[0]);
  };

  const obtenerInformacion = async (): Promise<IContacts[]> => {
    try {
      const url = process.env.base_url;
      const response: AxiosResponse<IContacts[]> = await axios.get(
        `${url}contacts`
      );
      return response.data;
    } catch (error) {
      console.error("Error al obtener la información desde la API", error);
      throw error;
    }
  };

  const address = "Gdor. Deloqui 756, Ushuaia, Tierra del Fuego, Argentina";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;


  return (
    <div>
      <SeccionBlack titulo={"Contacto"} descripcion={""}></SeccionBlack>
      <div className="p-16" style={{ backgroundColor: "#f6f8f9" }}>
        <div className="bg-white pb-20 flex flex-col gap-5 md:grid md:grid-cols-2 p-10 border border-gray-300 md:items-center justify-items-center ">
          <div className="flex flex-col gap-3">
            {/* <h3 className="text-black font-bold"> Dirección</h3> */}
            <p style={{ color: "#ffaa00", fontWeight: "bold" }}>
              <Place
                style={{ color: "#ffaa00", marginRight: "10px" }}
                fontSize="small"
              />
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">

                {contact?.direccion}
              </a>

            </p>
            <p style={{ color: "#ffaa00", fontWeight: "bold" }}>
              <a href={"tel:" + contact?.telefono}>
                <LocalPhone
                  style={{ color: "#ffaa00", marginRight: "10px" }}
                  fontSize="small"
                />
                {contact?.telefono}
              </a>
            </p>
            <p style={{ color: "#ffaa00", fontWeight: "bold" }}>
              <a href={"mailto:" + contact?.email}>
                <Email
                  style={{ color: "#ffaa00", marginRight: "10px" }}
                  fontSize="small"
                />
                {contact?.email}
              </a>
            </p>
          </div>

          <div className="text-gray-600 flex flex-col gap-3">
            {/* <h3 className=" text-black font-bold ">Horarios</h3> */}
            <p>
              <AccessTime
                style={{ color: "#ffaa00", marginRight: "10px" }}
                fontSize="small"
              />
              <span className="font-bold">{contact?.horario1}</span>
            </p>
            <p>
              <AccessTime
                style={{ color: "#ffaa00", marginRight: "10px" }}
                fontSize="small"
              />
              <span className="font-bold">{contact?.horario2}</span>
            </p>
            <p>
              <AccessTime
                style={{ color: "#ffaa00", marginRight: "10px" }}
                fontSize="small"
              />
              <span className="font-bold">{contact?.horario3}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
