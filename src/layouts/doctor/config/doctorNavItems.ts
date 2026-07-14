import type { ElementType } from "react";
import {
  Activity,
  ClipboardCheck,
  Home,
  Hospital,
  Pill,
  Stethoscope,
  Syringe,
  UserPlus,
} from "lucide-react";
import {
  AddAlertIcon,
  BabyIcon,
  BlockIcon,
  BreastfeedingIcon,
  DashboardLayoutIcon,
  FamilyIcon,
  GridMenuIcon,
  PregnantWomanIcon,
  ReceiptIcon,
} from "@doctor-shared/svgs/navIcons";

export type NavItem = {
  label: string;
  icon: ElementType<{ className?: string; strokeWidth?: number }>;
  link: string;
};

export const MAIN_MENU: NavItem[] = [
  { label: "Dashboard", icon: DashboardLayoutIcon, link: "/doctor" },
];

export const PATIENT_MANAGEMENT: NavItem[] = [
  { label: "Admission", icon: Hospital, link: "/doctor/admission" },
  {
    label: "Available Ward",
    icon: GridMenuIcon,
    link: "/doctor/available-ward",
  },
  { label: "Discharge", icon: Home, link: "/doctor/discharge" },
];

export const PERFORM_ACTION: NavItem[] = [
  { label: "Make Request", icon: BlockIcon, link: "/doctor/make-request" },
  { label: "Set Reminder", icon: AddAlertIcon, link: "/doctor/set-reminder" },
];

export const REPORTS: NavItem[] = [
  {
    label: "Admission",
    icon: ClipboardCheck,
    link: "/doctor/reports/admission",
  },
  { label: "Discharge", icon: Home, link: "/doctor/reports/discharge" },
  {
    label: "Doctor Logs",
    icon: Stethoscope,
    link: "/doctor/doctor-logs",
  },
  { label: "Immunization", icon: Syringe, link: "/doctor/immunization" },
  { label: "Ante Natal", icon: PregnantWomanIcon, link: "/doctor/ante-natal" },
  {
    label: "Child Birth",
    icon: BreastfeedingIcon,
    link: "/doctor/child-birth",
  },
  { label: "Post Natal", icon: BabyIcon, link: "/doctor/post-natal" },
  {
    label: "Registration",
    icon: UserPlus,
    link: "/doctor/registration-log",
  },
  {
    label: "Family Planning",
    icon: FamilyIcon,
    link: "/doctor/family-planning",
  },
  {
    label: "Dispensed Drugs",
    icon: Pill,
    link: "/doctor/dispensed-drugs",
  },
  {
    label: "Report Writing",
    icon: ReceiptIcon,
    link: "/doctor/report-writing",
  },
  {
    label: "Requisition",
    icon: Activity,
    link: "/doctor/requisition",
  },
];
