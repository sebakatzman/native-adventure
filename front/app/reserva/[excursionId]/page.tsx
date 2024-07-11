"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Step1 } from "@/components/Reserva/Step1";
import { IReserve } from "@/Models/IReserve";
import { Step2 } from "@/components/Reserva/Step2";
import { Step3 } from "@/components/Reserva/Step3";
import { Step4 } from "@/components/Reserva/Step4";
import { MenuForm } from "@/components/Reserva/MenuForm";
import { Step5 } from "@/components/Reserva/Step5";
import { IMedicalForm } from "@/Models/IMedicalForm";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const steps = [
  "Informacion",
  "Detalles",
  "Reserva",
  "Menu",
  "Formulario Medico",
];

export default function ReservaPage({
  params,
}: {
  params: { excursionId: number };
}) {

  const router = useRouter();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    const completaFormulario = activeStep === steps.length - 1 ? true : false;
    setDisabled(true);
    if (completaFormulario)
      save();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1
            reserve={reserve}
            handleChange={handleChange}
            emailError={emailError}
            setDisabled={setDisabled}
          ></Step1>
        );
      case 1:
        return <Step2 reserve={reserve} handleChange={handleChange} setDisabled={setDisabled}></Step2>;
      case 2:
        return <Step3 reserve={reserve} handleChange={handleChange} setDisabled={setDisabled} excursionId={params.excursionId}></Step3>;
      case 3:
        return (
          <Step4
            reserve={reserve}
            handleChange={handleChange}
            setMenuSelected={setMenuSelected}
            setDisabled={setDisabled}
          ></Step4>
        );
      case 4:
        return (
          <Step5
            medicalForm={medicalForm}
            setMedicalForm={setMedicalForm}
            setDisabled={setDisabled}
          ></Step5>
        );
      // case 5:
      //   return (
      //     <MenuForm reserve={reserve} handleChange={handleChange}></MenuForm>
      //   );

      default:
        handleChange;
        return "Paso desconocido";
    }
  };

  // -----------------------------Logica Reserva -----------------------------------------

  const initalState: IReserve = {
    accommodation: "",
    age: undefined,
    date_of_birth: undefined,
    dni: undefined,
    full_name: "",
    mail: "",
    nationality: "",
    phone: "",
    reservation_date: undefined,
    restriction_dietary: "",
    menu: "",
    excursion: params.excursionId
  };

  const initStateMedicalForm: IMedicalForm = {
    emergency_contact: "",
    health_insurance: "",
    height: undefined,
    weight: undefined,
    hypertension: false,
    diabetes: false,
    allergic_reactions: false,
    respiratory_diseases: false,
    cardiovascular_diseases: false,
    musculoskeletal_diseases: false,
    phobia_or_fear: false,
    smoking: false,
    alcohol: false,
    exercise_limitation: false,
    other: false,
    any_other_condition: "",
    any_treatment: "",
    surgical_procedure: "",
  };

  const [reserve, setReserve] = useState<IReserve>(initalState);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [medicalForm, setMedicalForm] =
    useState<IMedicalForm>(initStateMedicalForm);

  const validarEmail = (name: string, value: string) => {
    setWriteEmail(true);
    if (name === "mail") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(value);
      setEmailError(isValid ? null : "Ingrese un correo electrónico válido");
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    validarEmail(name, value);
    setReserve((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [menuSelected, setMenuSelected] = useState("");

  useEffect(() => {
    const name = "menu";
    setReserve((info) => ({
      ...info,
      [name]: menuSelected,
    }));
  }, [menuSelected]);

  const sendMails = async () => {
    console.log("logica para email");
  };

  const [disabled, setDisabled] = useState(true);
  const [writeEmail, setWriteEmail] = useState(false)

  const save = () => {
    saveDataToUrl()
    sendMails();
  }

  const saveDataToUrl = async () => {
    try {
      // Guardar reserve en la URL
      const reserveResponse = await fetch(`${process.env.base_url}reservations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reserve),
      });

      // Verificar si la respuesta es exitosa y obtener el id de reserve
      if (reserveResponse.ok) {
        const reserveData = await reserveResponse.json();
        const reserveId = reserveData.id;

        // Actualizar medicalForm con el id de reserve
        const updatedMedicalForm: IMedicalForm = { ...medicalForm, reservation: reserveId };

        // Guardar medicalForm en la URL
        const medicalFormResponse = await fetch(`${process.env.base_url}medical-forms/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedMedicalForm),
        });

        // Verificar si la respuesta de guardar medicalForm es exitosa
        if (medicalFormResponse.ok) {
          console.log('Datos guardados con éxito');
          handleOpen();
        } else {
          console.error('Error al guardar medicalForm en la URL');
        }
      } else {
        console.error('Error al guardar reserve en la URL');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();


  const handleOpen = () => {
    onOpen();
  }

  return (
    <Box sx={{ width: "100%" }}>
      <div className="md:mx-auto md:max-w-2xl lg:max-w-4xl xl:max-w-6xl">
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                  {/* <h1 style={{ color: "white" }}> {label}</h1> */}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div> {getStepContent(activeStep)}</div>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} disabled={disabled || !writeEmail}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>


      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Exito</ModalHeader>
              <ModalBody>
                <p>RESERVA GENERADA EXITOSAMENTE!</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => router.push(`/`)}>
                  CERRAR.
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        <style jsx>{`
    /* Estilos CSS en línea para centrar verticalmente el modal */
    @media (max-height: 600px) {
      .ModalContent {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20vh; /* Ajusta según sea necesario */
      }
    }
  `}</style>
      </Modal>
    </Box>
  );
}
