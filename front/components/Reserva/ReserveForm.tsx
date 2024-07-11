import { IExcurcion } from "@/Models/IExcursion";
import { IReserve } from "@/Models/IReserve";
import { maxWidth } from "@mui/system";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { useEffect, useState } from "react";
interface props {
    excursionSelected: IExcurcion | undefined;
}
export const ReserveForm = ({ excursionSelected }: props) => {

    interface IInfo {
        fechaDesde: Date | undefined,
        fechaHasta: Date | undefined,
        cantidadPersonas: number | undefined
    }

    interface IErrors {
        cantidadPersonas?: string;
        fechaDesde?: string;
        fechaHasta?: string;
    }

    const [errors, setErrors] = useState<IErrors>({});

    const initialState = {
        fechaDesde: undefined,
        fechaHasta: undefined,
        cantidadPersonas: undefined
    };

    const [info, setInfo] = useState<IInfo>(initialState);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
    }, [info])

    const guardar = () => {
        const canSave = validateForm();

        if (canSave.cantidadPersonas != undefined || canSave.fechaDesde != undefined || canSave.fechaHasta != undefined)
            return false;

        // Verificar si hay errores antes de continuar
        if (Object.keys(errors).length > 0) {
            return;
        }

        const { cantidadPersonas, fechaDesde, fechaHasta } = info;
        const mensajeWhatsApp = `Hola, me interesa la excursión ${excursionSelected?.name}. Somos ${cantidadPersonas} persona/s y estare/emos desde el ${fechaDesde} hasta el ${fechaHasta}.`;
        const numeroWhatsApp = '+542901614736';
        const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeWhatsApp)}`;
        window.open(enlaceWhatsApp, '_blank');
        cleanFields();
    };

    const cleanFields = () => {
        
        const inf: IInfo = {
            cantidadPersonas: undefined,
            fechaDesde: undefined,
            fechaHasta: undefined
        }
        
        setInfo(inf);
    }

    // useEffect(() => {
    //     // Validar el formulario cada vez que cambian los datos
    //     validateForm();
    // }, [info]);

    const validateForm = () => {
        const newErrors: IErrors = {};

        if (!info.cantidadPersonas && info.cantidadPersonas !== 0) {
            newErrors.cantidadPersonas = '¡Este campo es obligatorio!';
        }
        if (!info.fechaDesde) {
            newErrors.fechaDesde = '¡Este campo es obligatorio!';
        }

        if (!info.fechaHasta) {
            newErrors.fechaHasta = '¡Este campo es obligatorio!';
        }

        setErrors(newErrors);
        return newErrors;
    };

    return (
        // ... (código existente)
        <div>
            <div>
                <h1>Cantidad de Personas | Number of People *</h1>
                <Input
                    type="number"
                    label="Cantidad de Personas"
                    name="cantidadPersonas"
                    value={info.cantidadPersonas?.toString()}
                    onChange={handleChange}
                />
                {errors.cantidadPersonas && <div style={{ color: 'red', fontSize: '14px' }}>{errors.cantidadPersonas}</div>}

            </div>

            <div style={{ marginBottom: "20px", paddingTop: "8px" }}>
                <h1>Disponibilidad de Fechas | Availability of Dates *</h1>
                <div style={{ display: "flex", gap: "10px", justifyContent: "space-around" }}>
                    <div style={{ flex: 1 }}>
                        <Input
                            type="date"
                            name="fechaDesde"
                            value={info.fechaDesde?.toString()}
                            onChange={handleChange}
                        />
                        {errors.fechaDesde && <div style={{ color: 'red', fontSize: '14px' }}>{errors.fechaDesde}</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                        <Input
                            type="date"
                            name="fechaHasta"
                            value={info.fechaHasta?.toString()}
                            onChange={handleChange}
                        />
                        {errors.fechaHasta && <div style={{ color: 'red', fontSize: '14px' }}>{errors.fechaHasta}</div>}
                    </div>
                </div>
            </div>


            <div className="items-center py-8">
                <Button color="warning" fullWidth onClick={guardar} >RESERVAR</Button>
            </div>
        </div>
    )
}
