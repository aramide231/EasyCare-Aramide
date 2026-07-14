import type { CategoryFieldConfig } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { CategoryFormWithHistory } from "@/pages/doctor/patientProfile/components/category";

const presentingComplaintFields: CategoryFieldConfig[] = [
  {
    name: "complaint",
    label: "Complaints / History of Presenting Complaints",
    tableLabel: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS",
    type: "textarea",
    required: true,
    fullWidth: true,
  },
];

const presentingComplaintsTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "complaint", label: "COMPLAINTS / HISTORY OF PRESENTING COMPLAINTS" },
];

/** Nurse form + history — used on doctor module (exchanged with nurse table-only). */
export default function NursePresentingComplaints() {
  return (
    <CategoryFormWithHistory
      sectionName="PRESENTING COMPLAINTS"
      fields={presentingComplaintFields}
      tableColumns={presentingComplaintsTableColumns}
      includeMetaColumns={false}
    />
  );
}
