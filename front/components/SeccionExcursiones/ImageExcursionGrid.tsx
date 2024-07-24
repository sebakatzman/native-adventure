import { IExcurcion } from "@/Models/IExcursion";
import { IImagesExcursion } from "@/Models/IImagesExcursion";
import { ISectionImageDetail } from "@/Models/ISectionImageDetail";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ImageGridProps {
  sectionId: number | undefined;
}
const ImageExcursionGrid: React.FC<ImageGridProps> = ({ sectionId }) => {

  const router = useRouter();
  const [imagesExcursions, setImagesExcursions] = useState<
    IImagesExcursion[]
  >([]);

  const [excursions, setExcursions] = useState<IExcurcion[]>()

  //Obtengo las excursiones
  const getExcursions = async () => {
    const url = process.env.base_url;
    const response = await axios.get<IExcurcion[]>(
      `${url}excursions`
    );
    if (response.data.length > 0) {
      let excursionsData = response.data;
      excursionsData = excursionsData.filter(x => x.section == sectionId).sort((a, b) => a.order - b.order);
      setExcursions(excursionsData);
    }
  };

  useEffect(function () {
    sectionId != undefined && getExcursions();
  }, [sectionId]);

  const handleExcursionClick = (excursionId: number) => {
    router.push(`/excursionDetail/${excursionId}`);
  };

   return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { excursions && excursions.map(excursion => (
        <div key={excursion.id} className="relative group cursor-pointer"
        onClick={() => handleExcursionClick(excursion.id)}
        >
          <div className="relative w-full h-64">
            <Image
              src={excursion.image}
              alt={excursion.name}
              layout="fill"
              objectFit="cover"
              className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 p-4">
            <h3 className="text-white text-lg font-bold">{excursion.name}</h3>
            {/* <p className="text-white text-sm font-bold">{excursion.difficulty}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageExcursionGrid;
