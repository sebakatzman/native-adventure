import { IMedicalForm } from "@/Models/IMedicalForm";
import { IReserve } from "@/Models/IReserve";
import { Input } from "@nextui-org/input";
import { ButtonGroupProvider, Checkbox, CheckboxGroup, Radio, RadioGroup, Button } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface props {
  medicalForm: IMedicalForm;
  setMedicalForm: any;
  setDisabled: any;
}

interface IMedicalFormAux {
  hypertension: boolean;
  diabetes: boolean;
  allergic_reactions: boolean;
  respiratory_diseases: boolean;
  cardiovascular_diseases: boolean;
  musculoskeletal_diseases: boolean;
  phobia_or_fear: boolean;
  smoking: boolean;
  alcohol: boolean;
  exercise_limitation: boolean;
  other: boolean;
}

export const Step5 = ({ medicalForm, setMedicalForm, setDisabled }: props) => {
  //Contain the fileds for selected true or false.
  const [medicalFormAux, setMedicalFormAux] = useState<IMedicalFormAux>({
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
    other: false
  });

  const handleCheckboxChange = (propertyName: keyof IMedicalFormAux) => {
    setMedicalFormAux((prevMedicalForm) => ({
      ...prevMedicalForm,
      [propertyName]: !prevMedicalForm[propertyName],
    }));
  };

  useEffect(() => {
    completeMedicalForm();
  }, [medicalFormAux]);

  const completeMedicalForm = ( ) => {

    const {
      hypertension,
      diabetes,
      allergic_reactions,
      respiratory_diseases,
      cardiovascular_diseases,
      musculoskeletal_diseases,
      phobia_or_fear,
      smoking,
      alcohol,
      exercise_limitation,
      other
    } = medicalFormAux;
    
    const newObject = {
      ...medicalForm,
      diabetes,
      allergic_reactions,
      respiratory_diseases,
      cardiovascular_diseases,
      musculoskeletal_diseases,
      phobia_or_fear,
      smoking,
      alcohol,
      exercise_limitation,
      other
    };

    setMedicalForm(newObject);

  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setMedicalForm((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isStep3Complete = () => {
    const { emergency_contact, health_insurance, height, weight, any_other_condition, any_treatment, surgical_procedure} = medicalForm;
    return emergency_contact!== '' && health_insurance !== '' && height?.toString() !== '' && weight?.toString() !== '' && any_other_condition != "" && any_treatment != "" && surgical_procedure != "";
  };
  useEffect(() => {
    setDisabled(!isStep3Complete());
  }, [medicalForm, setDisabled]);

  return (
    <div>
      <h1 style={{ fontSize: "50px" }}>NATIVE ADVENTURE </h1>
      <h1 style={{ fontSize: "30px" }}>
        Registro de actividad y Seguro - Insurance Activity´s form.
      </h1>
      <h2 style={{ fontSize: "40px" }}>Formulario médico | Medical Form</h2>

      <div>
        <div style={{ marginBottom: "20px" }}>
          <h1>
            Contacto de Emergencia (nombre completo + número de teléfono) | In
            case of an emergency please contact (Name & Surname, Phone Number)
          </h1>
          <Input
            type="text"
            label="Respuesta"
            name="emergency_contact"
            value={medicalForm.emergency_contact}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h1>
            {" "}
            Seguro médico, ya sea a través de una empresa o de un seguro médico
            personal | Health insurance, either through an employer or personal
            health insurance.{" "}
          </h1>
          <Input
            type="text"
            name="health_insurance"
            label="Respuesta"
            value={medicalForm.health_insurance}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h1> Altura | Heigh </h1>
          <Input
            type="number"
            label="Altura"
            name="height"
            value={
              medicalForm.height !== undefined ? String(medicalForm.height) : ""
            }
            onChange={handleChange}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h1> Peso | Weight </h1>
          <Input
            type="number"
            label="Peso"
            name="weight"
            value={
              medicalForm.weight !== undefined ? String(medicalForm.weight) : ""
            }
            onChange={handleChange}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <h1>
            Padece alguna de estas enfermedades? O ha padecido alguna de ellas
            en el pasado? |Do you have any of these conditions? Or have you had
            any of these in the past?
          </h1>

          <div className="flex flex-col mb-5">
            <Checkbox
              isSelected={medicalFormAux.hypertension}
              onValueChange={(e) => handleCheckboxChange("hypertension")}
            >
              Hipertensión | Hypertension
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.diabetes}
              onValueChange={(e) => handleCheckboxChange("diabetes")}
            >
              Diabetes
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.allergic_reactions}
              onValueChange={(e) => handleCheckboxChange("allergic_reactions")}
            >
              Alergias | Allergic reactions
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.respiratory_diseases}
              onValueChange={(e) => handleCheckboxChange("respiratory_diseases")}
            >
              Enfermedades respiratorias|Respiratory deseases{" "}
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.cardiovascular_diseases}
              onValueChange={(e) =>
                handleCheckboxChange("cardiovascular_diseases")
              }
            >
              Enfermedades cardiovasculares | Cardiovascular diseases{" "}
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.musculoskeletal_diseases}
              onValueChange={(e) =>
                handleCheckboxChange("musculoskeletal_diseases")
              }
            >
              Enfermedades musculoesqueléticas | Musculoskeletal diseases
            </Checkbox>
            
            <Checkbox
              isSelected={medicalFormAux.phobia_or_fear}
              onValueChange={(e) =>
                handleCheckboxChange("phobia_or_fear")
              }
            >
              Fobia o miedo | Phobia or fear
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.smoking}
              onValueChange={(e) =>
                handleCheckboxChange("smoking")
              }
            >
              Fumador | Smoking
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.alcohol}
              onValueChange={(e) =>
                handleCheckboxChange("alcohol")
              }
            >
              Alcoholicó | Alcohol
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.exercise_limitation}
              onValueChange={(e) =>
                handleCheckboxChange("exercise_limitation")
              }
            >
            Limitaciones del ejercicio físico | Physical exercise limitations
            </Checkbox>

            <Checkbox
              isSelected={medicalFormAux.other}
              onValueChange={(e) =>
                handleCheckboxChange("other")
              }
            >
            Otros | Other
            </Checkbox>
          </div>

          <div style={{ marginBottom: "20px" }}>
          <h1>
          Si tiene cualquier otra afección, especifique | If you have “any other condition”, please specify
          </h1>
          <Input
            type="text"
            label="Respuesta"
            name="any_other_condition"
            value={medicalForm.any_other_condition}
            onChange={handleChange}
          />
        </div>  

        <div style={{ marginBottom: "20px" }}>
          <h1>
          Si se encuentra bajo algún tratamiento médico indique con qué medicación es tratado. De caso contrario responder NO  |    Are you under treatment taking any medication? Wich one? If you don´t are under any treatment answer NO
          </h1>
          <Input
            type="text"
            label="Respuesta"
            name="any_treatment"
            value={medicalForm.any_treatment}
            onChange={handleChange}
          />
        </div>  

        <div style={{ marginBottom: "20px" }}>
          <h1>
          ¿Ha sufrido recientemente alguna lesión física? ¿Se ha sometido recientemente a alguna intervención quirúrgica? | Have you recently had any physical injury? Have you recently had any surgical procedure?Please, specify
          </h1>
          <Input
            type="text"
            label="Respuesta"
            name="surgical_procedure"
            value={medicalForm.surgical_procedure}
            onChange={handleChange}
          />
        </div>  

        </div>
      </div>
    </div>
  );
};
