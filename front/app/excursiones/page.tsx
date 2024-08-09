"use client";
import { ISeccionExcursion } from "@/Models/ISeccionExcursion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Slider from "react-slick";

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
    <div className="slider-container">
      {sections && sections.length > 0 && (
        <Slider {...settings}>
          {sections.map((section) => (
            <div
              key={section.id}
              className="slide"
              onClick={() => router.push(`/excursiones/${section.id}`)}
            >
              <h1 className="slide-title">{section.name.toUpperCase()}</h1>
              <div className="slide-overlay"></div>
              <Image
                src={section.image}
                layout="fill"
                objectFit="cover"
                quality={100}
                alt={section.name}
                className="slide-image"
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
