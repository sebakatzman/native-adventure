"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inicio from "../components/Inicio/inicio";
import Excursiones from "@/components/Excursiones/excursiones";
import FotosPage from "@/components/SeccionFotos/FotosPage";
import ClientesContentos from "@/components/ClientesContentos/clientesContentos";
import Contacto from "@/components/Contacto/contacto";
import { NextUIProvider } from "@nextui-org/system";
import React, { useEffect, useState } from "react";
import ExcursionsPage from "@/components/SeccionExcursiones/ExcursionsPage";

function Home() {

  return (
    <NextUIProvider>
      <Inicio />
      <ExcursionsPage />
      <Inicio />
      <Excursiones />
      <FotosPage />
      <ClientesContentos />
      <Contacto />
    </NextUIProvider>
  );
}

export default Home;
