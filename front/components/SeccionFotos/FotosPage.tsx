import React, { useEffect, useState } from "react";
import ActividadBoton from "./ActividadBoton";
import ImageGrid from "./ImagesGrid";
import SeccionBlack from "../seccionBlack";

function FotosPage() {
  return (
    <div>
      <SeccionBlack titulo={"Fotos"} descripcion={""}></SeccionBlack>
      <div className="bg-white pb-20 p-10">
        <ActividadBoton />
      </div>
    </div>
  );
}

export default FotosPage;
