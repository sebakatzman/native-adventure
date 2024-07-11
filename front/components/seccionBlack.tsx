import React from "react";
import { title } from "./primitives";

interface props {
  titulo: string;
  descripcion: string | null;
}

export const SeccionBlack = ({ titulo, descripcion }: props) => {
  return (
    <div className="h-80 bg-black flex flex-col justify-center text-center">
      <div>
        <h1 style={{fontSize: "25px", paddingBottom: "20px", color: "#fff", fontWeight: "700"}}>{titulo}</h1>
      </div>
      <p style={{ color: "#fff", marginTop: "12px", fontSize: "15px", lineHeight: "1.8" }} >{descripcion}</p>
    </div>
  );
};

export default SeccionBlack;
