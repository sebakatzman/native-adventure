import { IReserve } from "@/Models/IReserve";
import { Input } from "@nextui-org/input";
import { Radio, RadioGroup } from "@nextui-org/react";
import React, { useEffect } from "react";
interface props {
  reserve: IReserve;
  handleChange: any;
  setMenuSelected: any;
  setDisabled: any;
}
export const Step4 = ({ reserve, handleChange, setMenuSelected, setDisabled}: props) => {
  const [selected, setSelected] = React.useState("");

  useEffect(() => {
    setMenuSelected(selected)
  }, [selected])
  
  useEffect(() => {
    
    if (reserve.menu != "" && reserve.restriction_dietary != "")
      setDisabled(false);
    else setDisabled(true);
  
  }, [reserve.menu, reserve.restriction_dietary])
  

  return (
    <div>
      <h1 style={{ fontSize: "50px" }}>NATIVE ADVENTURE </h1>
      <h1 style={{ fontSize: "30px" }}>
        Registro de actividad y Seguro - Insurance Activity´s form.
      </h1>
      <h2 style={{ fontSize: "40px" }}>
        Elección del Menú | Menú selection (Choose the option corresponding to
        your activity)
      </h2>
      Tiene restricciones alimentarias? | Do you have any dietary restrictions?
      (e.g. vegetarian, vegan, celiac) You must inform us.
      <div style={{ marginBottom: "20px" }}>
        <Input
          type="text"
          name="restriction_dietary"
          label="Respuesta"
          value={reserve.restriction_dietary}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <RadioGroup
            label="Seleccione su menu"
            value={selected}
            onValueChange={setSelected}
          >
            <Radio value="Standard">Standard</Radio>
            <Radio value="Vegetariano  | Veggie">Vegetariano | Veggie</Radio>
            <Radio value="Vegano  | Vegan">Vegano | Vegan</Radio>
            <Radio value="Sin TACC  | TLC-free">Sin TACC | TLC-free</Radio>
          </RadioGroup>
          <p className="text-default-500 text-small">
            Seleccionado: {selected}
          </p>
        </div>
      </div>
    </div>
  );
};
