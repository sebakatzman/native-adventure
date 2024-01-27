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
    const response = await axios.get<ISeccionExcursion[]>(`${process.env.base_url}sections`);    
    setSections(response.data.filter((x) => x.has_excursions));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="max-w-screen-lg mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">¡ HORA DE AVENTURARSE !</h2>
        <div className="grid grid-cols-1 gap-8">
          {sections &&
            sections.map((section) => (
              <div
                key={section.id}
                className="p-4 rounded-lg shadow-md"
                style={{ background: "#ffaa00" }}
              >
                <h3 className="text-xl font-semibold mb-2">{section.name}</h3>

                <Image
                  src={section.image}
                  width={1200}
                  height={200}
                  alt={section.name}
                  className="mb-4 rounded-md w-full"
                />
                <Button
                  style={{ color: "#ffaa00" }}
                  onClick={() => router.push(`/excursiones/${section.id}`)}
                >
                  Visitar
                </Button>
                {/* Puedes agregar más detalles o enlaces aquí según tus necesidades */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
