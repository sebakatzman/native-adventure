import { IExcurcion } from "@/Models/IExcursion";
import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import { ISectionImages } from "@/Models/ISectionImage";
import { ISectionImageDetail } from "@/Models/ISectionImageDetail";
import axios from "axios";
import { env } from "process";
import { useEffect, useState } from "react";
import ImageGrid from "./ImagesGrid";

function ActividadBoton() {
  const handleActivityClick = (id: number) => {
    setExcursionId(id);
  };

  const [sectionImages, setSectionImages] = useState<ISectionImages[]>([]);
  const [excursionId, setExcursionId] = useState(0);

  const getData = async () => {
    const url = process.env.base_url;
    const response = await axios.get<ISectionImages[]>(`${url}section-images`);
    setSectionImages(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <ul className="text-center flex gap-10 justify-center font-bold  list-none text-black  mb-10">
        <li
          className={`cursor-pointer ${excursionId == 0 && "underline"}`}
          style={{ textDecorationColor: "#ffaa00" }}
          onClick={() => handleActivityClick(0)}
        >
          TODOS
        </li>
        {sectionImages?.map((ex) => (
          <li
            key={ex.id}
            className={`cursor-pointer ${excursionId == ex.id && "underline"}`}
            style={{ textDecorationColor: "#ffaa00" }}
            onClick={() => handleActivityClick(ex.id)}
          >
            {ex.title}
          </li>
        ))}
      </ul>

      <div>
        <ImageGrid selectedActivity={excursionId} />
      </div>
      {/* Agrega más botones para otras actividades si es necesario */}
    </div>
  );
}

export default ActividadBoton;
