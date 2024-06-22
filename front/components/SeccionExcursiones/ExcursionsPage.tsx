import React, { useEffect, useState } from "react";
import SeccionBlack from "../seccionBlack";
import ActividadBotonExcursiones from "./ActividadBotonExcursiones";

function ExcursionsPage() {
  return (
    <div>
      <SeccionBlack titulo={"Excursiones"} descripcion={""}></SeccionBlack>
      <div className="bg-white pb-20 p-10">
        <ActividadBotonExcursiones />
      </div>
    </div>
  );
}

export default ExcursionsPage;
