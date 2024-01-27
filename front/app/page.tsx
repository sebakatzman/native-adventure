"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inicio from "../components/Inicio/inicio";
import Excursiones from "@/components/Excursiones/excursiones";
import { useEffect, useState } from "react";
import ImagenDescripcion from "@/components/Excursiones/imagenDescripcion";
import FotosPage from "@/components/SeccionFotos/FotosPage";
import ClientesContentos from "@/components/ClientesContentos/clientesContentos";
import Contacto from "@/components/Contacto/contacto";
import { NextUIProvider } from "@nextui-org/system";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const overlapDistance = -scrollY / 2;

  return (
    <NextUIProvider>
      <div>
          <Inicio></Inicio>
          <Excursiones></Excursiones>
          <ImagenDescripcion></ImagenDescripcion>
          <FotosPage></FotosPage>
          <ClientesContentos></ClientesContentos>
          <Contacto></Contacto>
      </div>
    </NextUIProvider>
  );
}

export default Home;
