export interface IReserve {
    id?: number;
    mail: string;
    dni?: number | undefined;
    full_name: string;
    age: number | undefined;
    date_of_birth?: Date | undefined;
    nationality: string;
    phone: string;
    accommodation: string;
    reservation_date?: Date | undefined;
    excursion?: number;
    restriction_dietary: string;
    menu: string;
}