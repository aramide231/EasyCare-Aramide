import type { CategoryFieldConfig } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { CategoryFormWithHistory } from "@/pages/doctor/patientProfile/components/category";

const diagnosisFields: CategoryFieldConfig[] = [
  {
    name: "diagnosis",
    label: "Diagnosis",
    tableLabel: "DIAGNOSIS",
    required: true,
  },
  {
    name: "doctor",
    label: "Doctor",
    tableLabel: "DOCTOR",
    required: true,
  },
];

const diagnosisTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "diagnosis", label: "DIAGNOSIS" },
  { key: "doctor", label: "DOCTOR" },
];

/** Nurse form + history — used on doctor module (exchanged with nurse table-only). */
export default function NurseDiagnosis() {
  return (
    <CategoryFormWithHistory
      sectionName="DIAGNOSIS"
      fields={diagnosisFields}
      tableColumns={diagnosisTableColumns}
      includeMetaColumns={false}
    />
  );
}
