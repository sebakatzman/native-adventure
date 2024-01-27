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
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { useRouter } from 'next/router'

export default function ReservaPage() {

  return (
    <div>hola</div>
  );
}
