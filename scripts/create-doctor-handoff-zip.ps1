# Bundles every path the doctor module needs (not just src/pages/doctor).
# Run from project root:  powershell -ExecutionPolicy Bypass -File .\scripts\create-doctor-handoff-zip.ps1

$ErrorActionPreference = "Stop"
$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$timestamp = Get-Date -Format "yyyy-MM-dd_HHmm"
$stageName = "EasyCare-doctor-handoff"
$stage = Join-Path $env:TEMP "$stageName-$timestamp"
$zipPath = Join-Path $projectRoot "$stageName-$timestamp.zip"

$directories = @(
  "src\pages\doctor",
  "src\layouts\doctor"
)

$files = @(
  "src\layouts\DoctorLayout.tsx",
  "src\routes\RoleBasedRoutes.tsx",
  "src\lib\dateTime.ts",
  "src\lib\utils.ts",
  "src\components\header\AppGridMenu.tsx",
  "src\index.css",
  "src\pages\nurse\patientProfile\hooks\useIsAdmittedInPatient.ts",
  "src\pages\nurse\patientProfile\PatientProfile.tsx",
  "src\pages\nurse\patientProfile\components\CategoryRenderer.tsx",
  "src\pages\nurse\patientProfile\components\CategoryFormAccordion.tsx",
  "src\pages\nurse\patientProfile\components\ExpandedCategoryTable.tsx",
  "src\pages\nurse\patientProfile\components\categories\Diagnosis.tsx",
  "src\pages\nurse\patientProfile\components\categories\PresentingComplaints.tsx",
  "src\pages\nurse\patientProfile\components\categories\Investigation.tsx",
  "src\pages\nurse\patientProfile\components\categories\ReportWriting.tsx",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.app.json",
  "package.json"
)

$handoffText = @"
EasyCare — Doctor module handoff
Generated: $timestamp

HOW TO MERGE (for your friend with Git)
1. Unzip this file.
2. Copy folders/files into the same paths in the EasyCare repo (overwrite when asked).
3. Run: npm install
4. Run: npm run dev
5. Sign in as Doctor and test /doctor routes.

WHAT IS INCLUDED
- src/pages/doctor/          (all doctor pages + @doctor-shared)
- src/layouts/doctor/        (sidebar, topbar)
- src/layouts/DoctorLayout.tsx
- src/routes/RoleBasedRoutes.tsx
- vite.config.ts + tsconfig  (@doctor-shared alias)
- Nurse patient-profile files that import doctor-shared
- src/lib/dateTime.ts        (dashboard calendar)

NOT INCLUDED (friend should already have these in the repo)
- node_modules — run npm install after merge
- diagnostics module — separate unless they already have it in RoleBasedRoutes

If something still looks old, they likely missed a path — send the full project zip instead.
"@

if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
New-Item -ItemType Directory -Path $stage -Force | Out-Null

foreach ($rel in $directories) {
  $src = Join-Path $projectRoot $rel
  if (-not (Test-Path $src)) {
    Write-Warning "Skipping missing folder: $rel"
    continue
  }
  $dest = Join-Path $stage $rel
  New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
  Copy-Item -Path $src -Destination $dest -Recurse -Force
}

foreach ($rel in $files) {
  $src = Join-Path $projectRoot $rel
  if (-not (Test-Path $src)) {
    Write-Warning "Skipping missing file: $rel"
    continue
  }
  $dest = Join-Path $stage $rel
  New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
  Copy-Item -Path $src -Destination $dest -Force
}

Set-Content -Path (Join-Path $stage "HANDOFF.txt") -Value $handoffText -Encoding UTF8

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path (Join-Path $stage "*") -DestinationPath $zipPath -Force
Remove-Item $stage -Recurse -Force

Write-Host ""
Write-Host "Done. Zip created at:"
Write-Host $zipPath
Write-Host ""
Write-Host "Send this file to your friend. They should unzip and copy into the repo."
