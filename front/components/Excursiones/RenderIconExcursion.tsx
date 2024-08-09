import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  seccionExcursion: ISeccionExcursion;
  handleItemClick: any;
  setState: (state: number) => void;
  activeTab: number | null;
}

export const RenderIconExcursion = ({
  seccionExcursion,
  handleItemClick,
  activeTab,
  setState,
}: Props) => {
  const handleClick = (id: number) => {
    setState(id);
    handleItemClick(id);
  };
  return (
    <div className="mb-16 animate__swing">
      {seccionExcursion && (
        <ul className="os-tabs cursor-pointer">
          <li
            className={`${activeTab === seccionExcursion.id ? "active" : ""}`}
            onClick={() => handleClick(seccionExcursion.id || 0)}
          >
            <Image
              src={seccionExcursion.icon}
              alt="das"
              width={60}
              height={60}
              style={{
                padding: "4px",
                lineHeight: "56px",
                textAlign: "center",
                color: "#a3a5a5",
                border: "2px solid  #ccc",
                borderRadius: "50%",
                fontSize: "28px",
                margin: "0 auto 18px",
                display: "block",
                position: "relative",
                top: "0",
              }}
            ></Image>
            {seccionExcursion.name}
            {activeTab === seccionExcursion.id && (
              <div
                className="orange-border" // Puedes definir una clase en tu CSS para el borde naranja
                style={{
                  height: "4px",
                  backgroundColor: "orange",
                  marginTop: "8px", // Ajusta según sea necesario
                }}
              ></div>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};
