"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/button";

function ImagenDescripcion() {

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <Image
          src={"/images/e-bikes-rental.jpg"}
          width={1200}
          alt="dsa"
          height={760}
          style={{ width: "100%", height: "auto" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%", // Ajusta la posición vertical
            left: "50%", // Ajusta la posición horizontal
            transform: "translate(-50%, -50%)", // Centra el texto
            //color: "#ffc527", // Color del texto
            padding: "10px", // Espacio interior
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="banner-center-box text-center">
                  <div className="flex">
                  <h1
                    style={{
                      color: "##ffaa00",
                      fontSize: "calc(3vw + 20px)", // Uso de vw para ajustar el tamaño relativamente
                      lineHeight: "1.2",
                      fontWeight: "700",
                      fontFamily: "serif",
                      paddingRight: "10px"
                    }}
                  >
                    EXPERIENCIA 
                  </h1>

                  <h1
                    style={{
                      color: "##ffaa00",
                      fontSize: "calc(3vw + 20px)", // Uso de vw para ajustar el tamaño relativamente
                      lineHeight: "1.2",
                      fontWeight: "700",
                      fontFamily: "serif",
                    }}
                  >
                    YAGHAN
                  </h1>

                  </div>

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
                    LA MEJOR VERSION DEL FIN DEL MUNDO
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagenDescripcion;
