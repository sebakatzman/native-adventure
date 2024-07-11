"use client";
import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ExcursionesPage() {
  const router = useRouter();
  const [sections, setSections] = useState<ISeccionExcursion[]>();

 const getData = async () => {
  try {
    const response = await axios.get<ISeccionExcursion[]>(`${process.env.base_url}sections`);
    const sortedSections = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
    setSections(sortedSections.filter((x) => x.has_excursions));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  useEffect(() => {
    getData();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  
  return (
    <div>
      <div className="max-w-screen-lg mx-auto p-8">
        <div className="grid grid-cols-1 gap-8">
          {sections &&
            sections.map((section) => (
              <div
                key={section.id}
                className="p-4 rounded-lg-md relative shadow text-center"
                onClick={() => router.push(`/excursiones/${section.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <h1
                  style={{
                    color: "#ffffff", // Color blanco
                    fontSize: "calc(3vw + 20px)",
                    lineHeight: "1.2",
                    fontWeight: "700",
                    fontFamily: "serif",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                >
                  {section.name.toUpperCase()}
                </h1>
                <div className="relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-gray-800 rounded-md"></div>
                  <Image
                    src={section.image}
                    width={1200}
                    height={600}
                    alt={section.name}
                    className="rounded-md shadow"
                    />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
