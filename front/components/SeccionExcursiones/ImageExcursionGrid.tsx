import { ISectionImageDetail } from "@/Models/ISectionImageDetail";
import { Image } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface ImageGridProps {
  selectedActivity: number | null;
}
const ImageExcursionGrid: React.FC<ImageGridProps> = ({ selectedActivity }) => {

  const [excursionesDetail, setExcursionesDetail] = useState<
    ISectionImageDetail[]
  >([]);

  const getData = async () => {
    const url = process.env.base_url;
    const response = await axios.get<ISectionImageDetail[]>(
      `${url}section-image-details`
    );
    setExcursionesDetail(response.data);
  };

  useEffect(function () {
    getData();
  }, []);  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {excursionesDetail
        .filter((fil) =>
          selectedActivity == 0
            ? fil.section_image !== selectedActivity
            : fil.section_image == selectedActivity
        )
        .map((exDetail) => (
          <div
            key={exDetail.id}
            className="w-full h-full transform transition-transform duration-500 hover:scale-105 hover:translate-x-2"
          >
            <Image
              isBlurred
              isZoomed
              src={exDetail.image}
              width={1200}
              alt="dsa"
              height={760}
              className="w-full h-80 lg:h-64 md:h-48 sm:h-auto object-cover"
            />
          </div>
        ))}
    </div>
  );
};

export default ImageExcursionGrid;
