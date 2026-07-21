import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import AppGridMenu from "@/components/header/AppGridMenu";
import ProfileMenu from "@/components/header/ProfileMenu";
import Clock from "./Clock";

const breadcrumbPatterns = [
  /^\/nurse\/?$/,
  /^\/nurse\/dashboard$/,
  /^\/nurse\/notifications$/,
  /^\/nurse\/admission$/,
  /^\/nurse\/discharge$/,
  /^\/nurse\/available-ward$/,
  /^\/nurse\/patient-profile\/.+/,
];

const Topbar = () => {
  const location = useLocation();

  const isBreadcrumbPage = breadcrumbPatterns.some((pattern) =>
    pattern.test(location.pathname),
  );

  const renderBreadcrumbs = () => {
    const isPatientProfile = /^\/nurse\/patient-profile\/.+/.test(
      location.pathname,
    );
    const pathParts = location.pathname.split("/").filter(Boolean);
    const trailParts = isPatientProfile ? pathParts.slice(0, -1) : pathParts;

    const breadcrumbItems = [
      { name: "Dashboard", path: "/nurse" },
      ...trailParts.map((part, index) => {
        const fullPath = `/${trailParts.slice(0, index + 1).join("/")}`;
        const formatted = Number.isNaN(Number(part))
          ? part.replace(/-/g, " ")
          : `ID: ${part}`;
        return { name: formatted, path: fullPath };
      }),
    ];

    return (
      <div className="flex h-10 min-w-0 items-center gap-1 text-sm text-gray-500">
        {breadcrumbItems.map((crumb, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          return (
            <span
              key={`${crumb.path}-${index}`}
              className="flex min-w-0 items-center gap-1"
            >
              {!isLast ? (
                <Link
                  to={crumb.path}
                  className="truncate capitalize text-[#573FD1] hover:underline"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="truncate capitalize">{crumb.name}</span>
              )}
              {!isLast && <span className="mx-1 shrink-0 text-gray-400">&gt;</span>}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <header className="w-full shrink-0 border-b border-gray-200 bg-white">
      <div className="grid min-h-[76px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3 md:px-8">
        {/* Left — search or breadcrumbs */}
        <div className="min-w-0 justify-self-start w-full max-w-md">
          {isBreadcrumbPage ? (
            <div className="flex h-10 min-w-0 items-center">
              {renderBreadcrumbs()}
            </div>
          ) : (
            <div className="relative h-10 w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center gap-3 pl-4">
                <Search
                  className="h-[18px] w-[18px] text-gray-500"
                  strokeWidth={2.5}
                />
                <span className="text-gray-300 font-light text-lg pb-0.5">|</span>
              </div>
              <input
                type="text"
                placeholder="Search Patients ID"
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-14 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-2 focus:border-[#573FD1]"
              />
            </div>
          )}
        </div>

        {/* Center — date & time */}
        <div className="justify-self-center shrink-0 px-2">
          <Clock />
        </div>

        {/* Right — grid + profile */}
        <div className="flex shrink-0 items-center justify-end gap-5 justify-self-end">
          <AppGridMenu />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
