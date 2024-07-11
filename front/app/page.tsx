"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Inicio from "../components/Inicio/inicio";
import Excursiones from "@/components/Excursiones/excursiones";
import ImagenDescripcion from "@/components/Excursiones/imagenDescripcion";
import FotosPage from "@/components/SeccionFotos/FotosPage";
import ClientesContentos from "@/components/ClientesContentos/clientesContentos";
import Contacto from "@/components/Contacto/contacto";
import { NextUIProvider } from "@nextui-org/system";

function Home() {
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
