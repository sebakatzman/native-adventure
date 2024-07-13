import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageExcursionGrid from "./ImageExcursionGrid";

function ActividadBotonExcursiones() {
  const [sections, setSections] = useState<ISeccionExcursion[]>();
  const [sectionSelected, setSectionSelected] = useState<ISeccionExcursion>();

  const handleSection = (sect: ISeccionExcursion) => {
    setSectionSelected(sect);
  };

  const getSections = async () => {
    const url = process.env.base_url;
    const response = await axios.get<ISeccionExcursion[]>(`${url}sections`);
    const filteredSections = response.data.filter(x => x.has_excursions);
    setSections(filteredSections);
    if (filteredSections.length > 0) {
      setSectionSelected(filteredSections[0]);
    }
  };

  useEffect(() => {
    getSections();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <ul className="text-center flex gap-10 justify-center font-bold list-none text-black mb-10">
        {sections?.map((section) => (
          <li
            key={section.id}
            className={`cursor-pointer ${section === sectionSelected ? "underline" : ""}`}
            style={{ textDecorationColor: "#ffaa00" }}
            onClick={() => handleSection(section)}
          >
            {section.name}
          </li>
        ))}
      </ul>

      <div>
        <ImageExcursionGrid sectionId={sectionSelected?.id} />
      </div>
    </div>
  );
}

export default ActividadBotonExcursiones;
