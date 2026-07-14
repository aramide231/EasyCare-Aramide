// routes/RoleBasedRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import FrontdeskLayout from "../layouts/FrontdeskLayout";
import NurseLayout from "../layouts/NurseLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

// Import frontDesk components
import FrontdeskDashboard from "../pages/frontdesk/dashboard/Dashboard";
import EditPatient from "@/pages/frontdesk/editPatient/EditPatient";
import Visitation from "@/pages/frontdesk/visitation";
import Notifications from "@/pages/frontdesk/notifications/Notifications";
import ManageAccess from "@/pages/frontdesk/manage-access/ManageAccess";
import ManageCard from "@/pages/frontdesk/manage-card/ManageCard";
import ReminderPage from "@/pages/frontdesk/set-reminder/ReminderPage";
import SetReminder from "@/pages/frontdesk/set-reminder/components/SetReminder";
import ViewReminder from "@/pages/frontdesk/set-reminder/components/ViewReminder";
import DoctorAssignment from "@/pages/frontdesk/doctors-assignment/DoctorAssignment";
import AnteNatal from "@/pages/frontdesk/ante-natal/AnteNatal";
import ChildBirth from "@/pages/frontdesk/child-birth/ChildBirth";
import PostNatal from "@/pages/frontdesk/post-natal/PostNatal";
import Immunization from "@/pages/frontdesk/immunization/Immunization";
import FamilyPlanning from "@/pages/frontdesk/family-planning/FamilyPlanning";
import FlagProfile from "@/pages/frontdesk/flag-profile/FlagProfile";

// import Nurse component
import NurseDashboard from "@/pages/nurse/dashboardNurse/Dashboard";
import NursePatientProfile from "@/pages/nurse/patientProfile/PatientProfile";
import NurseAdmission from "@/pages/nurse/admission/Admission";
import NurseAvailableWard from "@/pages/nurse/availableWard/AvailableWard";
import NurseDispensedDrugs from "@/pages/nurse/dispensedDrugs/DispensedDrugsReport";
import NurseDischarge from "@/pages/nurse/discharge/Discharge";
import NurseAdmissionReport from "@/pages/nurse/reports/AdmissionReport";
import NurseDischargeReport from "@/pages/nurse/reports/DischargeReport";

// import doctors component
import DoctorDashboard from "@/pages/doctor/dashboard/DoctorDashboard";
import DoctorNotification from "@/pages/doctor/notifications/DoctorNotifications";
import DoctorPatientProfile from "@/pages/doctor/patientProfile/PatientProfile";
import DoctorAccountSettings from "@/pages/doctor/account/AccountSettings";
import DoctorYourProfile from "@/pages/doctor/account/YourProfile";
import DoctorFlagProfile from "@/pages/doctor/flag-profile/DoctorFlagProfile";
import DoctorAdmission from "@/pages/doctor/admission/Admission";
import DoctorDischarge from "@/pages/doctor/discharge/Discharge";
import DoctorAdmissionReport from "@/pages/doctor/reports/AdmissionReport";
import DoctorAnteNatalReport from "@/pages/doctor/reports/AnteNatalReport";
import DoctorChildBirthReport from "@/pages/doctor/reports/ChildBirthReport";
import DoctorDischargeReport from "@/pages/doctor/reports/DischargeReport";
import DoctorFamilyPlanningReport from "@/pages/doctor/reports/FamilyPlanningReport";
import DoctorImmunizationReport from "@/pages/doctor/reports/ImmunizationReport";
import DoctorLogsReport from "@/pages/doctor/reports/DoctorLogsReport";
import DoctorPostNatalReport from "@/pages/doctor/reports/PostNatalReport";
import DoctorPreviousPatientRecords from "@/pages/doctor/previousPatientRecords/PreviousPatientRecords";
import DoctorRegistrationReport from "@/pages/doctor/reports/RegistrationReport";
import ComingSoonPage from "@/components/ui/ComingSoonPage";
import DiagnosticsDashboard from "@/pages/diagnostics/dashboard/DiagnosticsDashboard";
import DiagnosticsNotifications from "@/pages/diagnostics/notifications/DiagnosticsNotifications";
import VisitationLog from "@/pages/diagnostics/visitation/VisitationLog";
import MakeRequest from "@/pages/diagnostics/make-request/MakeRequest";
import DiagnosticsSetReminder from "@/pages/diagnostics/set-reminder/SetReminder";
import InvestigativeList from "@/pages/diagnostics/investigative-list/InvestigativeList";
import RequestLogs from "@/pages/diagnostics/request-logs/RequestLogs";
import InvestigationLogs from "@/pages/diagnostics/investigation-logs/InvestigationLogs";
import InvestigationProfile from "@/pages/diagnostics/investigation-profile/InvestigationProfile";
import DiagnosticsPatientProfile from "@/pages/diagnostics/patient-profile/DiagnosticsPatientProfile";
import DiagnosticsPreviousPatientRecords from "@/pages/diagnostics/previous-patient-records/DiagnosticsPreviousPatientRecords";

import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AuthenticationPage from "@/pages/auth/AuthenticationPage";
import Verification from "@/pages/auth/components/Verification";
import ForgotPassword from "@/pages/auth/components/ForgotPassword";
import RegistrationLog from "@/pages/frontdesk/RegistrationLog";
import RegistrationForm from "@/pages/frontdesk/Registration/RegistrationForm";
import DiagnosticsLayout from "../layouts/DiagnosticsLayout";


const ROLE_HOME: Record<string, string> = {
  frontdesk: "/frontdesk",
  nurse: "/nurse",
  doctor: "/doctor",
  admin: "/admin",
  diagnostics: "/diagnostics",
};

const RoleBasedRoutes = () => {
  const { user } = useAuth();
  const homePath = user ? ROLE_HOME[user.userRole] ?? "/auth" : "/auth";

  return (
    <Routes>
      <Route path="/" element={<Navigate to={homePath} replace />} />
      <Route path="/auth" element={<AuthenticationPage />} />
      <Route path="/auth/verification" element={<Verification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

     

      {/* Frontdesk */}
      {user && user.userRole === "frontdesk" && (
        <Route path="/frontdesk" element={<FrontdeskLayout />}>
          <Route index element={<FrontdeskDashboard />} />
          <Route path="edit/:id" element={<EditPatient />} />
          <Route path="visitation-log" element={<Visitation />} />
          <Route path="registration" element={<RegistrationForm />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="manage-access" element={<ManageAccess />} />
          <Route path="manage-card" element={<ManageCard />} />
          <Route path="reminder" element={<ReminderPage />} />
          <Route path="reminder/set-reminder" element={<SetReminder />} />
          <Route path="reminder/view-schedule" element={<ViewReminder />} />
          <Route path="doctor-assignments" element={<DoctorAssignment />} />
          <Route path="ante-natal" element={<AnteNatal />} />
          <Route path="child-birth" element={<ChildBirth />} />
          <Route path="post-natal" element={<PostNatal />} />
          <Route path="immunization" element={<Immunization />} />
          <Route path="family-planning" element={<FamilyPlanning />} />
          <Route path="registration-log" element={<RegistrationLog />} />
          <Route path="flag-profile/:id" element={<FlagProfile />} />
        </Route>
      )}

      {/* Nurse */}
      {user && user.userRole === "nurse" && (
        <Route path="/nurse" element={<NurseLayout />}>
          <Route index element={<NurseDashboard />} />
          <Route path="dashboard" element={<NurseDashboard />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="admission" element={<NurseAdmission />} />
          <Route path="available-ward" element={<NurseAvailableWard />} />
          <Route path="dispensed-drugs" element={<NurseDispensedDrugs />} />
          <Route path="discharge" element={<NurseDischarge />} />
          <Route path="reports/admission" element={<NurseAdmissionReport />} />
          <Route path="reports/discharge" element={<NurseDischargeReport />} />
          <Route path="patient-profile/:id" element={<NursePatientProfile />} />
        </Route>
      )}

      {/* Doctor — always available for frontend development */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="notifications-doctor" element={<DoctorNotification />} />
        <Route path="patient-profile/:id" element={<DoctorPatientProfile />} />
        <Route path="account" element={<DoctorAccountSettings />} />
        <Route path="account/profile" element={<DoctorYourProfile />} />
        <Route path="flag-profile/:id" element={<DoctorFlagProfile />} />
        <Route
          path="previous-patient-records/:patientId"
          element={<DoctorPreviousPatientRecords />}
        />
        <Route path="admission" element={<DoctorAdmission />} />
        <Route path="available-ward" element={<NurseAvailableWard />} />
        <Route path="dispensed-drugs" element={<NurseDispensedDrugs />} />
        <Route path="discharge" element={<DoctorDischarge />} />
        <Route
          path="make-request"
          element={<ComingSoonPage title="Make Request" />}
        />
        <Route
          path="set-reminder"
          element={<ComingSoonPage title="Set Reminder" />}
        />
        <Route path="reports/admission" element={<DoctorAdmissionReport />} />
        <Route path="reports/discharge" element={<DoctorDischargeReport />} />
        <Route path="doctor-logs" element={<DoctorLogsReport />} />
        <Route path="immunization" element={<DoctorImmunizationReport />} />
        <Route path="ante-natal" element={<DoctorAnteNatalReport />} />
        <Route path="child-birth" element={<DoctorChildBirthReport />} />
        <Route path="post-natal" element={<DoctorPostNatalReport />} />
        <Route
          path="registration-log"
          element={<DoctorRegistrationReport />}
        />
        <Route
          path="family-planning"
          element={<DoctorFamilyPlanningReport />}
        />
        <Route
          path="report-writing"
          element={<ComingSoonPage title="Report Writing" />}
        />
        <Route
          path="requisition"
          element={<ComingSoonPage title="Requisition" />}
        />
      </Route>

      {/* Diagnostics / Laboratory — always available for frontend development */}
      <Route path="/diagnostics" element={<DiagnosticsLayout />}>
        <Route index element={<DiagnosticsDashboard />} />
        <Route path="notifications" element={<DiagnosticsNotifications />} />
        <Route path="visitation-logs" element={<VisitationLog />} />
        <Route path="make-request" element={<MakeRequest />} />
        <Route path="investigative-list" element={<InvestigativeList />} />
        <Route path="set-reminder" element={<DiagnosticsSetReminder />} />
        <Route path="request-logs" element={<RequestLogs />} />
        <Route path="investigation-logs" element={<InvestigationLogs />} />
        <Route
          path="patient-profile/:id"
          element={<DiagnosticsPatientProfile />}
        />
        <Route
          path="previous-patient-records/:id"
          element={<DiagnosticsPreviousPatientRecords />}
        />
        <Route
          path="investigation-profile/:id"
          element={<InvestigationProfile />}
        />
      </Route>

      {/* Admin */}
      {user && user.userRole === "admin" && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<div>User Management</div>} />
        </Route>
      )}

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoleBasedRoutes;
