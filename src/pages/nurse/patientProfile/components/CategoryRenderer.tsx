import { categoryComponents as doctorCategoryComponents } from "@/pages/doctor/patientProfile/components/CategoryRenderer";
import DoctorPresentingComplaints from "@/pages/doctor/patientProfile/components/categories/shared/PresentingComplaints";
import DoctorDiagnosis from "@/pages/doctor/patientProfile/components/categories/shared/Diagnosis";
import NurseInvestigation from "./categories/Investigation";
import NurseReportWriting from "./categories/ReportWriting";

/** Nurse — PC & Diagnosis swapped with doctor (table review); Investigation stays table-only; Report Writing keeps the documentation box. */
export const nurseCategoryComponents = {
  ...doctorCategoryComponents,
  "PRESENTING COMPLAINTS": DoctorPresentingComplaints,
  DIAGNOSIS: DoctorDiagnosis,
  INVESTIGATION: NurseInvestigation,
  "REPORT WRITING": NurseReportWriting,
};
