export interface IMedicalForm {
    id?: number;
    emergency_contact?: string;
    health_insurance?: string; //seguro medico
    height?: number | undefined ; //altura
    weight?: number | undefined; //peso
    hypertension: boolean;
    diabetes: boolean;
    allergic_reactions: boolean
    respiratory_diseases: boolean
    cardiovascular_diseases: boolean
    musculoskeletal_diseases: boolean
    phobia_or_fear: boolean
    smoking: boolean
    alcohol: boolean
    exercise_limitation: boolean
    other: boolean,
    any_other_condition: string;
    any_treatment: string //Algun tratamiento medico
    surgical_procedure: string; //Alguna intervencion quirurjuca
    reservation?: number;
}