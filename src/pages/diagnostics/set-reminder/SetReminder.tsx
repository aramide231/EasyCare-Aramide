import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import calendartime from "@/assets/icon/calendar_clock.png";
import successIcon from "@/assets/image/Succes 2 (1).png";
import {
  formFieldInputClass,
  formFieldSelectClass,
} from "@/pages/doctor/patientProfile/lib/formFieldStyles";
import DiagnosticsRequestFormShell from "../components/request-form/DiagnosticsRequestFormShell";
import { EMPTY_DEPARTMENT_FORM } from "../components/request-form/requestFormOptions";
import { useDiagnosticsRequestPatient } from "../components/request-form/useDiagnosticsRequestPatient";
import type { DepartmentForm } from "../components/request-form/requestFormOptions";

const SNOOZE_OPTIONS = [
  { value: "", label: "Select time frame" },
  { value: "5", label: "5 minutes" },
  { value: "10", label: "10 minutes" },
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
];

const SetReminder = () => {
  const [departmentForm, setDepartmentForm] =
    useState<DepartmentForm>(EMPTY_DEPARTMENT_FORM);
  const [reminderNote, setReminderNote] = useState("");
  const [snoozeFrequency, setSnoozeFrequency] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(() => new Date().toTimeString().slice(0, 5));
  const [reminderLabel, setReminderLabel] = useState(() =>
    format(new Date(), "dd-MM-yyyy / hh : mm aa")
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedPatientName, setSavedPatientName] = useState("");

  const {
    patientForm,
    patientLoaded,
    admissionError,
    updatePatientField,
    handleUniqueIdBlur,
    handlePatientTypeChange,
    resetPatientForm,
  } = useDiagnosticsRequestPatient();

  const updateDepartmentField = <K extends keyof DepartmentForm>(
    key: K,
    value: DepartmentForm[K]
  ) => {
    setDepartmentForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetReminderFields = () => {
    setReminderNote("");
    setSnoozeFrequency("");
    setDate(new Date());
    setTime(new Date().toTimeString().slice(0, 5));
    setReminderLabel(format(new Date(), "dd-MM-yyyy / hh : mm aa"));
  };

  const handleSubmit = () => {
    if (!departmentForm.department) {
      toast.error("Select a department.");
      return;
    }
    if (!patientForm.patientType || !patientForm.uniqueId.trim()) {
      toast.error("Complete the patient type and unique ID.");
      return;
    }
    if (admissionError) {
      toast.error(admissionError);
      return;
    }
    if (!patientForm.name.trim()) {
      toast.error("Patient details could not be loaded. Check the unique ID.");
      return;
    }
    if (!snoozeFrequency) {
      toast.error("Select a snooze frequency.");
      return;
    }
    if (!reminderNote.trim()) {
      toast.error("Enter a reminder note.");
      return;
    }

    setSavedPatientName(patientForm.name);
    setSuccess(true);
  };

  const handleSuccessClose = () => {
    setSuccess(false);
    setDepartmentForm(EMPTY_DEPARTMENT_FORM);
    resetPatientForm();
    resetReminderFields();
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
        <div className="flex h-[400px] w-full max-w-[500px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-xl">
          <img src={successIcon} alt="Success" className="mb-6" />
          <p className="mb-8 text-center text-base font-medium">
            You have successfully set a reminder for{" "}
            <span className="font-semibold">{savedPatientName}</span>
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-[#573FD1] py-4 text-white"
            onClick={handleSuccessClose}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <DiagnosticsRequestFormShell
      title="Set Reminder"
      departmentForm={departmentForm}
      onDepartmentChange={updateDepartmentField}
      patientForm={patientForm}
      patientLoaded={patientLoaded}
      admissionError={admissionError}
      onPatientFieldChange={updatePatientField}
      onPatientTypeChange={handlePatientTypeChange}
      onUniqueIdBlur={handleUniqueIdBlur}
      onSubmit={handleSubmit}
      submitLabel="Save Reminder"
    >
      <div className="space-y-4 border-t border-gray-200 pt-6">
        <h2 className="text-base font-semibold text-gray-900">Reminder</h2>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Reminder Time
            </label>
            <div className="relative">
              <input
                type="text"
                readOnly
                value={reminderLabel}
                placeholder="dd-mm-yyyy / hh : mm A"
                onClick={() => setPickerOpen(true)}
                className={`${formFieldInputClass} cursor-pointer`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setPickerOpen(true)}
                aria-label="Open reminder schedule"
              >
                <img src={calendartime} alt="" className="h-6 w-6" />
              </button>
            </div>

            {pickerOpen ? (
              <div className="absolute z-50 mt-2 rounded-md border bg-white p-6 shadow-lg">
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="MMMM dd, yyyy"
                  minDate={new Date()}
                  inline
                />
                <div className="mt-3">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="rounded-md border p-2"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="w-1/2 rounded-lg border border-[#573FD1] px-4 py-2 text-[#573FD1]"
                    onClick={() => setPickerOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-1/2 rounded-lg bg-[#573FD1] px-4 py-2 text-white"
                    onClick={() => {
                      if (date && time) {
                        const [hours, minutes] = time.split(":");
                        const updated = new Date(date);
                        updated.setHours(Number(hours));
                        updated.setMinutes(Number(minutes));
                        setReminderLabel(
                          format(updated, "dd-MM-yyyy / hh : mm aa")
                        );
                      }
                      setPickerOpen(false);
                    }}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Snooze Frequency
            </label>
            <select
              value={snoozeFrequency}
              onChange={(e) => setSnoozeFrequency(e.target.value)}
              className={formFieldSelectClass}
            >
              {SNOOZE_OPTIONS.map((option) => (
                <option key={option.value || "empty"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Reminder Note
            </label>
            <input
              type="text"
              value={reminderNote}
              onChange={(e) => setReminderNote(e.target.value)}
              placeholder="Type in the description here"
              className={formFieldInputClass}
            />
          </div>
        </div>
      </div>
    </DiagnosticsRequestFormShell>
  );
};

export default SetReminder;
