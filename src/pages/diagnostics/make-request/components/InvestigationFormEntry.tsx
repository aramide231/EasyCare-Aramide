import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import calendartime from "@/assets/icon/calendar_clock.png";
import {
  formFieldGridClass,
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import {
  INVESTIGATION_FORM_DEFAULTS,
  MALARIA_PARASITE_ROWS,
  PARAMETER_TYPE_OPTIONS,
  SPECIMEN_TYPE_OPTIONS,
} from "../data/investigationFormEntryFigma";

type MalariaResultRow = {
  label: string;
  o: string;
  h: string;
};

const EMPTY_MALARIA_ROWS: MalariaResultRow[] = MALARIA_PARASITE_ROWS.map(
  (label) => ({ label, o: "", h: "" })
);

export default function InvestigationFormEntry() {
  const [specimenType, setSpecimenType] = useState("");
  const [parameterType, setParameterType] = useState("");
  const [malariaRows, setMalariaRows] =
    useState<MalariaResultRow[]>(EMPTY_MALARIA_ROWS);
  const [requestedBy, setRequestedBy] = useState("");
  const [doneBy, setDoneBy] = useState("");
  const [requestDateTime, setRequestDateTime] = useState<Date | null>(
    new Date()
  );
  const [resultDateTime, setResultDateTime] = useState<Date | null>(null);
  const [requestPickerOpen, setRequestPickerOpen] = useState(false);
  const [resultPickerOpen, setResultPickerOpen] = useState(false);

  const updateMalariaCell = (
    index: number,
    field: "o" | "h",
    value: string
  ) => {
    setMalariaRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const handleConfirm = () => {
    if (!specimenType) {
      toast.error("Select a specimen type.");
      return;
    }
    if (!parameterType) {
      toast.error("Select a parameter type.");
      return;
    }
    toast.success("Investigation request confirmed.");
  };

  const formatDateTimeLabel = (date: Date | null) =>
    date ? format(date, "dd-MM-yyyy / hh : mm aa") : "";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-center text-sm font-bold uppercase tracking-wide text-gray-800">
        Investigation Form Entry
      </h1>

      <div className={`${formFieldGridClass} mb-6`}>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Specimen Type
          </label>
          <div className="relative">
            <select
              value={specimenType}
              onChange={(e) => setSpecimenType(e.target.value)}
              className={`${formFieldSelectClass} pr-10`}
            >
              <option value="">
                select specimen type from the drop down list
              </option>
              {SPECIMEN_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
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
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Parameter Type
          </label>
          <div className="relative">
            <select
              value={parameterType}
              onChange={(e) => setParameterType(e.target.value)}
              className={`${formFieldSelectClass} pr-10`}
            >
              <option value="">
                select parameter type from the drop down list
              </option>
              {PARAMETER_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-3 text-xs font-bold uppercase text-gray-800">
          Malaria Parasite Result
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-2 text-left font-medium" />
                <th className="px-4 py-2 text-center font-medium">O</th>
                <th className="px-4 py-2 text-center font-medium">H</th>
              </tr>
            </thead>
            <tbody>
              {malariaRows.map((row, index) => (
                <tr key={row.label} className="border-b border-gray-100">
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {row.label}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={row.o}
                      onChange={(e) =>
                        updateMalariaCell(index, "o", e.target.value)
                      }
                      className={`${formFieldInputClass} h-9`}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="text"
                      value={row.h}
                      onChange={(e) =>
                        updateMalariaCell(index, "h", e.target.value)
                      }
                      className={`${formFieldInputClass} h-9`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${formFieldGridClass} mb-6`}>
        <div className="relative">
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Date | Time of Investigation Request
          </label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={formatDateTimeLabel(requestDateTime)}
              onClick={() => setRequestPickerOpen(true)}
              className={`${formFieldInputClass} cursor-pointer pr-10`}
              placeholder="dd-mm-yyyy / hh : mm A"
            />
            <button
              type="button"
              onClick={() => setRequestPickerOpen(true)}
              className="absolute inset-y-0 right-3 flex items-center"
              aria-label="Pick request date and time"
            >
              <img src={calendartime} alt="" className="h-5 w-5" />
            </button>
          </div>
          {requestPickerOpen ? (
            <div className="absolute z-50 mt-2 rounded-lg border bg-white p-4 shadow-lg">
              <DatePicker
                selected={requestDateTime}
                onChange={(date) => setRequestDateTime(date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                dateFormat="dd-MM-yyyy / hh : mm aa"
                inline
              />
              <button
                type="button"
                onClick={() => setRequestPickerOpen(false)}
                className="mt-2 w-full rounded-lg bg-[#573FD1] py-2 text-sm text-white"
              >
                Done
              </button>
            </div>
          ) : null}
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Date | Time of Investigation Result
          </label>
          <div className="relative">
            <input
              type="text"
              readOnly
              value={formatDateTimeLabel(resultDateTime)}
              onClick={() => setResultPickerOpen(true)}
              className={`${formFieldInputClass} cursor-pointer pr-10`}
              placeholder="dd-mm-yyyy / hh : mm A"
            />
            <button
              type="button"
              onClick={() => setResultPickerOpen(true)}
              className="absolute inset-y-0 right-3 flex items-center"
              aria-label="Pick result date and time"
            >
              <img src={calendartime} alt="" className="h-5 w-5" />
            </button>
          </div>
          {resultPickerOpen ? (
            <div className="absolute z-50 mt-2 rounded-lg border bg-white p-4 shadow-lg">
              <DatePicker
                selected={resultDateTime}
                onChange={(date) => setResultDateTime(date)}
                showTimeSelect
                timeFormat="hh:mm aa"
                dateFormat="dd-MM-yyyy / hh : mm aa"
                inline
              />
              <button
                type="button"
                onClick={() => setResultPickerOpen(false)}
                className="mt-2 w-full rounded-lg bg-[#573FD1] py-2 text-sm text-white"
              >
                Done
              </button>
            </div>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Requested By
          </label>
          <input
            type="text"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
            placeholder="capture name of staff..."
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Done By
          </label>
          <input
            type="text"
            value={doneBy}
            onChange={(e) => setDoneBy(e.target.value)}
            placeholder="capture name of staff..."
            className={formFieldInputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Type
          </label>
          <input
            type="text"
            readOnly
            value={INVESTIGATION_FORM_DEFAULTS.investigationType}
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold uppercase text-gray-700">
            Investigation Name
          </label>
          <input
            type="text"
            readOnly
            value={INVESTIGATION_FORM_DEFAULTS.investigationName}
            className={`${formFieldInputClass} bg-gray-100 text-gray-600`}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleConfirm}
          className="min-w-[200px] rounded-lg bg-[#573FD1] px-8 py-3 text-sm font-semibold text-white hover:bg-[#4a35b8]"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
