import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/pages/doctor");
const shared = path.join(root, "shared");

const replacements = [
  [/from "@\/lib\/utils"/g, 'from "@doctor-shared/lib/utils"'],
  [/from "@\/lib\/dateTime"/g, 'from "@doctor-shared/lib/dateTime"'],
  [/from "@\/context\/AuthContext"/g, 'from "@doctor-shared/context/useAuth"'],
  [/from "@\/pages\/nurse\/components\/LogSearchBar"/g, 'from "@doctor-shared/components/LogSearchBar"'],
  [/from "@\/pages\/nurse\/components\/TablePagination"/g, 'from "@doctor-shared/components/TablePagination"'],
  [/from "@\/pages\/nurse\/lib\/pagination"/g, 'from "@doctor-shared/lib/pagination"'],
  [/from "@\/pages\/nurse\/lib\/patientTypeStyles"/g, 'from "@doctor-shared/lib/patientTypeStyles"'],
  [/from "@\/pages\/nurse\/context\/PatientManagementContext"/g, 'from "@doctor-shared/context/PatientManagementContext"'],
  [/from "@\/pages\/nurse\/admission\/data\/mockAdmissions"/g, 'from "@doctor-shared/admission/data/mockAdmissions"'],
  [/from "@\/pages\/nurse\/admission\/data\/mockWards"/g, 'from "@doctor-shared/admission/data/mockWards"'],
  [/from "@\/pages\/nurse\/admission\/data\/takeActionOptions"/g, 'from "@doctor-shared/admission/data/takeActionOptions"'],
  [/from "@\/pages\/nurse\/admission\/components\/([^"]+)"/g, 'from "@doctor-shared/admission/components/$1"'],
  [/from "@\/pages\/nurse\/discharge\/data\/mockDischargedPatients"/g, 'from "@doctor-shared/discharge/data/mockDischargedPatients"'],
  [/from "@\/pages\/nurse\/discharge\/lib\/remarkStyles"/g, 'from "@doctor-shared/discharge/lib/remarkStyles"'],
  [/from "@\/pages\/nurse\/discharge\/components\/([^"]+)"/g, 'from "@doctor-shared/discharge/components/$1"'],
  [/from "@\/pages\/frontdesk\/ante-natal\/components\/AnteLog"/g, 'from "@doctor-shared/reports/frontdesk/AnteLog"'],
  [/from "@\/pages\/frontdesk\/doctors-assignment\/components\/DoctorLog"/g, 'from "@doctor-shared/reports/frontdesk/DoctorLog"'],
  [/from "@\/pages\/frontdesk\/RegistrationLog\/components\/register"/g, 'from "@doctor-shared/reports/frontdesk/register"'],
  [/from "@\/pages\/frontdesk\/post-natal\/components\/PostRecord"/g, 'from "@doctor-shared/reports/frontdesk/PostRecord"'],
  [/from "@\/pages\/frontdesk\/family-planning\/components\/FamilyReport"/g, 'from "@doctor-shared/reports/frontdesk/FamilyReport"'],
  [/from "@\/constant\/ExportButton"/g, 'from "@doctor-shared/components/ExportButton"'],
  [/from "@\/constant\/patientCard"/g, 'from "@doctor-shared/components/PatientCard"'],
  [/from "@\/components\/ui\/input"/g, 'from "@doctor-shared/components/Input"'],
  [/from "@\/components\/ui\/ComingSoonPage"/g, 'from "@doctor-shared/components/ComingSoonPage"'],
  [/from "@\/components\/ui\/flagprofile-report"/g, 'from "@doctor-shared/components/FlagProfileReport"'],
  [/from "@\/components\/ui\/notificationTable"/g, 'from "@doctor-shared/components/NotificationTable"'],
  [/from "@\/components\/header\/AppGridMenu"/g, 'from "@doctor-shared/components/AppGridMenu"'],
  [/from "@\/layouts\/nurse\/components\/Clock"/g, 'from "@doctor-shared/components/layout/Clock"'],
  [/from "@\/layouts\/nurse\/components\/EasyCareMark"/g, 'from "@doctor-shared/components/layout/EasyCareMark"'],
  [/from "@\/layouts\/nurse\/components\/ChevronToggle"/g, 'from "@doctor-shared/components/layout/ChevronToggle"'],
  [/from "@\/svgs\/frontdesk\/svg"/g, 'from "@doctor-shared/svgs/navIcons"'],
  [/from "@\/assets\/image\/haywhy\.jpg"/g, 'from "@doctor-shared/assets/image/haywhy.jpg"'],
  [/from "@\/assets\/image\/dashboard-card-pattern\.png"/g, 'from "@doctor-shared/assets/image/dashboard-card-pattern.png"'],
  [/from "@\/assets\/image\/dashboard-card-pattern-notification\.png"/g, 'from "@doctor-shared/assets/image/dashboard-card-pattern-notification.png"'],
  [/from "@\/assets\/image\/Succes 2 \(1\)\.png"/g, 'from "@doctor-shared/assets/image/Succes 2 (1).png"'],
  [/from "@\/assets\/image\/empty-notification\.png"/g, 'from "@doctor-shared/assets/image/empty-notification.png"'],
  [/from "@\/assets\/icon\/Frame 121\.svg"/g, 'from "@doctor-shared/assets/icon/Frame 121.svg"'],
  [/from "@\/assets\/icon\/Frame 5\.svg"/g, 'from "@doctor-shared/assets/icon/Frame 5.svg"'],
  [/from "@\/data\/mockNotifications"/g, 'from "@doctor-shared/data/mockNotifications"'],
  [/from "@\/pages\/nurse\/reports\/DischargeReport"/g, 'from "@/pages/doctor/reports/DischargeReport"'],
  [/from "@\/pages\/nurse\/reports\/AdmissionReport"/g, 'from "@/pages/doctor/reports/AdmissionReport"'],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

const targets = [
  ...walk(root),
  ...walk(path.resolve("src/layouts/doctor")),
];

let changed = 0;
for (const file of targets) {
  if (file.includes(`${path.sep}shared${path.sep}`) && file.endsWith("AppGridMenu.tsx")) {
    continue;
  }
  let content = fs.readFileSync(file, "utf8");
  const original = content;
  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    changed++;
  }
}

console.log(`Patched ${changed} files`);
