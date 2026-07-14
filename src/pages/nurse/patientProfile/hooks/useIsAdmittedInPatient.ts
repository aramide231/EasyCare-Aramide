import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { usePatientManagement } from "@/pages/nurse/context/PatientManagementContext";
import { isAdmittedInPatientType } from "@/pages/doctor/patientProfile/config/genConsultPatientTypes";
import { useGenConsultSession } from "@/pages/doctor/patientProfile/hooks/genConsultSession";

type ProfilePatient = {
  patientId?: string;
};

/** True when the patient is officially In-Patient (admitted / bedside). */
export function useIsAdmittedInPatient(): boolean {
  const location = useLocation();
  const patient = location.state?.patient as ProfilePatient | undefined;
  const { admissions } = usePatientManagement();
  const { active, patientTypeId } = useGenConsultSession();

  return useMemo(() => {
    const isGenConsultAdmitted =
      active &&
      (isAdmittedInPatientType(patientTypeId) ||
        patientTypeId === "ward-round");

    const patientId = patient?.patientId?.trim().toLowerCase();
    const isOnAdmissionLog =
      Boolean(patientId) &&
      admissions.some(
        (admission) => admission.patientId.trim().toLowerCase() === patientId
      );

    return isGenConsultAdmitted || isOnAdmissionLog;
  }, [active, patientTypeId, patient?.patientId, admissions]);
}
