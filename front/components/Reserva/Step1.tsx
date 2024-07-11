import { IReserve } from "@/Models/IReserve";
import { Typography } from "@mui/joy";
import { Input } from "@nextui-org/input";
import { ButtonGroupProvider, Checkbox, CheckboxGroup, Radio, RadioGroup, Button } from "@nextui-org/react";
import axios from "axios";
import { AnyMxRecord } from "dns";
import React, { useEffect } from "react";

interface props {
  reserve: IReserve;
  handleChange: any;
  emailError: any;
  setDisabled: any;
}

export const Step1 = ({ reserve, handleChange, emailError, setDisabled }: props) => {

  useEffect(() => {    
    if (emailError) setDisabled(true);
    else 
      setDisabled(false);
  }, [emailError])
  
  const saveComentary = async () => {
    try {
      const apiUrl = `${process.env.base_url}comentarios/`;
      const comentarioData = {
        name: 'Nombre del Comentario',
        description: 'Descripción del Comentario',
        disabled: false, // Puedes ajustar este valor según tus necesidades
      };
      const response = await axios.post(apiUrl, comentarioData);
      if (response.status === 200) {
        console.log('Comentario guardado con éxito');
      } else {
        console.error('Error al guardar el comentario');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud POST');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: "50px" }}>NATIVE ADVENTURE </h1>
      <h1 style={{ fontSize: "30px" }}>
        Registro de actividad y Seguro - Insurance Activity´s form.
      </h1>
      <h1 style={{ marginBottom: "20px" }}>
        Nuestra empresa utiliza este formulario de autoevaluación para atender
        mejor a nuestros clientes. Es fundamental responder con sinceridad, ya
        que la información garantizará la seguridad durante las actividades. El
        formulario también sirve como declaración de buena salud.
      </h1>
      <h1 style={{ marginBottom: "20px" }}>
        {" "}
        Our company uses this self-assessment form to better serve our
        customers. It is crucial to answer honestly as the information will
        ensure safety during activities. The form also acts as a declaration of
        good health.
      </h1>
      <Input
        type="email"
        name="mail"
        label="Mail"
        value={reserve.mail}
        onChange={handleChange}
      />
      {emailError && <p style={{ color: '#dc3545', marginTop: '5px', fontSize: '0.9em' }}>{emailError}</p>}
    </div>
  );
};
