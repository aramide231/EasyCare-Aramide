import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import { categoryDetailsTitle } from "@/pages/doctor/patientProfile/config/categoryFieldTypes";
import { useMedicalTable } from "@/pages/doctor/patientProfile/hooks/useMedicalTable";
import { usePendingCategoryDraft } from "@/pages/doctor/patientProfile/hooks/usePendingCategoryDraft";
import CategoryMedicalTable from "@/pages/doctor/patientProfile/components/category/CategoryMedicalTable";
import {
  formFieldGridClass,
  formFieldSelectClass,
  formFieldTextareaClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import { useIsAdmittedInPatient } from "../../hooks/useIsAdmittedInPatient";

const WARD_TYPE_OPTIONS = [
  { value: "GENERAL", label: "General Ward" },
  { value: "MALE", label: "Male Ward" },
  { value: "FEMALE", label: "Female Ward" },
  { value: "PEDIATRIC", label: "Pediatric Ward" },
  { value: "EXECUTIVE", label: "Executive Room" },
];

const WARD_OPTIONS = [
  { value: "Male Ward", label: "Male Ward" },
  { value: "Female Ward", label: "Female Ward" },
  { value: "Children Ward", label: "Children Ward" },
  { value: "Executive Room 1", label: "Executive Room 1" },
];

const reportTableColumns = [
  { key: "sn", label: "SN" },
  { key: "dateTime", label: "DATE | TIME" },
  { key: "patientType", label: "PATIENT TYPE" },
  { key: "wardType", label: "SELECT WARD" },
  { key: "ward", label: "WARD" },
  { key: "comment", label: "COMMENT" },
];

/** Nurse: documents report writing (open box) and reviews the record table. */
export default function NurseReportWriting() {
  const isAdmittedInPatient = useIsAdmittedInPatient();
  const [form, setForm] = useState({
    wardType: "",
    ward: "Male Ward",
    comment: "",
  });
  const { history } = useMedicalTable("REPORT WRITING");

  const clearForm = useCallback(
    () => setForm({ wardType: "", ward: "Male Ward", comment: "" }),
    []
  );

  usePendingCategoryDraft(
    "REPORT WRITING",
    () => {
      if (isAdmittedInPatient || !form.comment.trim()) return null;
      return {
        wardType: form.wardType,
        ward: form.ward,
        comment: form.comment.trim(),
      };
    },
    [form, isAdmittedInPatient],
    clearForm
  );

  return (
    <div className="space-y-6">
      {!isAdmittedInPatient ? (
        <div className={formFieldGridClass}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Select Ward
            </label>
            <div className="relative">
              <select
                value={form.wardType}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, wardType: e.target.value }))
                }
                className={`${formFieldSelectClass} pr-10`}
              >
                <option value="">-Select an Option-</option>
                {WARD_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ward
            </label>
            <div className="relative">
              <select
                value={form.ward}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, ward: e.target.value }))
                }
                className={`${formFieldSelectClass} pr-10`}
              >
                {WARD_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              rows={8}
              value={form.comment}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder={`Assessment:\nPatient complains of...\n\nIntervention:\n...\n\nRecommendation:\n...`}
              className={`${formFieldTextareaClass} min-h-[180px]`}
            />
          </div>
        </div>
      ) : null}

      <CategoryMedicalTable
        title={categoryDetailsTitle("REPORT WRITING")}
        columns={reportTableColumns}
        rows={history}
        emptyMessage="No report writing entries recorded yet."
      />
    </div>
  );
}
