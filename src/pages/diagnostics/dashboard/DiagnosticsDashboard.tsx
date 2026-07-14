import { useState } from "react";
import CustomCalendar from "@/pages/doctor/dashboard/components/calendar";
import {
  getPatientsLogRowById,
  type DiagnosticsPatientsLogRow,
} from "../data/mockDiagnostics";
import DiagnosticsDashboardSummary from "./components/DiagnosticsDashboardSummary";
import DashboardPatientsLog from "./components/DashboardPatientsLog";
import DashboardPatientCard from "./components/DashboardPatientCard";

const DiagnosticsDashboard = () => {
  const [selectedPatient, setSelectedPatient] =
    useState<DiagnosticsPatientsLogRow | null>(() => getPatientsLogRowById(7));

  return (
    <div className="mt-0 flex gap-6">
      <div className="flex-[3]">
        <DiagnosticsDashboardSummary />
        <DashboardPatientsLog
          selectedId={selectedPatient?.id ?? null}
          onSelectRow={setSelectedPatient}
        />
      </div>

      <div className="flex-[1]">
        <CustomCalendar width="100%" />
        <DashboardPatientCard
          key={selectedPatient?.id ?? "none"}
          patient={selectedPatient}
        />
      </div>
    </div>
  );
};

export default DiagnosticsDashboard;
