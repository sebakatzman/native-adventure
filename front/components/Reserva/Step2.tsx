import { IReserve } from "@/Models/IReserve";
import { Input } from "@nextui-org/input";
import React, {useEffect} from "react";
interface props {
  reserve: IReserve;
  handleChange: any;
  setDisabled: any;
}
export const Step2 = ({ reserve, handleChange, setDisabled }: props) => {

  // Función de validación específica para el Step 2
  const isStep2Complete = () => {
    const { dni, mail, age, date_of_birth, phone, accommodation } = reserve;
    return dni?.toString() !== '' && mail !== '' && age?.toString() !== '' && date_of_birth?.toString() !== '' && phone !== '' && accommodation !== '';
  };
  
  useEffect(() => {
    // Llamamos a la función de validación y actualizamos el estado de disabled en el componente principal
    setDisabled(!isStep2Complete());
  }, [reserve, setDisabled]);

  return (
    <div className="md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
      <h1 style={{ fontSize: "50px" }}>NATIVE ADVENTURE </h1>
      <h1 style={{ fontSize: "30px" }}>
        Registro de actividad y Seguro - Insurance Activity´s form.
      </h1>
      <h2 style={{ fontSize: "40px" }}>
        Datos personales de contacto | Contact personal details
      </h2>
      <div>
        <div style={{ marginBottom: "20px" }}>
          <h1>DNI | Identity document | Passport number.</h1>
          <Input
            type="number"
            label="Dni"
            name="dni"
            value={reserve.dni !== undefined ? String(reserve.dni) : ''}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Nombre completo | Full name *</h1>
          <Input
            type="text"
            name="full_name"
            label="Nombre"
            value={reserve.full_name}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Edad | Age *</h1>
          <Input
            type="number"
            label="Edad"
            name="age"
            value={reserve.age !== undefined ? String(reserve.age) : ''}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Fecha nacimiento | Date of birth</h1>
          <Input
            type="date"
            name="date_of_birth"
            value={reserve.date_of_birth?.toString()}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Nacionalidad | Nationality</h1>
          <Input
            type="text"
            label="Nacionalidad"
            name="nationality"
            value={reserve.nationality}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>Teléfono | Cell phone number *</h1>
          <Input
            type="number"
            label="Telefono"
            name="phone"
            value={reserve.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <h1>Hospedaje en Ushuaia | Accommodation in Ushuaia</h1>
          <Input
            type="text"
            label="Hospedaje"
            name="accommodation"
            value={reserve.accommodation}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
