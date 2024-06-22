import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageExcursionGrid from "./ImageExcursionGrid";

function ActividadBotonExcursiones() {
  const handleActivityClick = (id: number) => {
    setSectionId(id);
  };

  const [sections, setSections] = useState<ISeccionExcursion[]>();
  const [sectionId, setSectionId] = useState(0);

  const getData = async () => {
    const url = process.env.base_url;
    const response = await axios.get<[]>(`${url}section-images`);
    setSections(response.data);
    // if (response.data.length > 0) {
    //   setExcursionId(response.data[0].id); // Establece el primer ID como seleccionado por defecto
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <ul className="text-center flex gap-10 justify-center font-bold  list-none text-black  mb-10">
        {sections?.map((section) => (
          <li
            key={section.id}
            className={`cursor-pointer ${sectionId == section.id && "underline"}`}
            style={{ textDecorationColor: "#ffaa00" }}
            onClick={() => handleActivityClick(section.id)}
          >
            {section.name}
          </li>
        ))}
      </ul>

      <div>
        <ImageExcursionGrid selectedActivity={sectionId} />
      </div>
      {/* Agrega más botones para otras actividades si es necesario */}
    </div>
  );
}

export default ActividadBotonExcursiones;
