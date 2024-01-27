import { IReserve } from "@/Models/IReserve";
import { Input } from "@nextui-org/input";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import React from "react";
interface props {
  reserve: IReserve;
  handleChange: any;
}
export const MenuForm = ({ reserve, handleChange }: props) => {

    const [selected, setSelected] = React.useState(["Standard"]);

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

      <h1>
        Tiene restricciones alimentarias? | Do you have any dietary
        restrictions? (e.g. vegetarian, vegan, celiac) You must inform us.
      </h1>
      <Input
        type="number"
        name="restriction_dietary"
        label="Restriccion"
        value={reserve.restriction_dietary}
        onChange={handleChange}
      />

      <CheckboxGroup
        label="Menu"
        value={selected}
        onValueChange={setSelected}
      >
        <Checkbox value="Standard">Standard</Checkbox>
        <Checkbox value="Vegetariano  | Veggie">Vegetariano  | Veggie</Checkbox>
        <Checkbox value="Vegano  | Vegan">Vegano  | Vegan</Checkbox>
        <Checkbox value="Sin TACC  | TLC-free">Sin TACC  | TLC-free</Checkbox>
      </CheckboxGroup>
    </div>
  );
};
