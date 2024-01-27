import { IInicio } from "@/Models/IInicio";


    const cards: IInicio[] = [
        {
            id: 1,
            firstTitle: "E-BIKES",
            secondTitle: "excursiones",
            description: "Sumale una nueva aventura a tu viaje de tierra del fuego y explora la isla.",
            image: "/images/alquiler-e-bikes-ushuaia.jpg",
            order: 1,
        },
        {
            id: 2,
            firstTitle: "TREKKING",
            secondTitle: "excursiones",
            description: "Sumale una nueva de tierra del fuego y explora la isla.",
            image: "/images/gemelas-2.jpg",
            order: 1,
        }
    ]


export const getCardsService = () => {
    return cards;
}