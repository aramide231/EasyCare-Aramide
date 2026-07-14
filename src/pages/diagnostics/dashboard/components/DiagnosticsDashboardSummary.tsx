import { FaBell, FaHospitalUser, FaUserCheck } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import DashboardSummaryCard from "@/pages/doctor/dashboard/components/DashboardSummaryCard";

export default function DiagnosticsDashboardSummary() {
  const { user } = useAuth();
  const displayName = user?.fullName ?? "John Doe";

  const items = [
    {
      title: "Out Patient",
      subtitle: "50 new patients",
      icon: <FaUserCheck size={22} className="text-white" />,
      variant: "dark" as const,
    },
    {
      title: "In Patient",
      subtitle: "15 patients",
      icon: <FaHospitalUser size={22} className="text-white" />,
      variant: "dark" as const,
    },
    {
      title: "Notifications",
      subtitle: "10 messages",
      icon: <FaBell size={22} className="text-[#FA7401]" />,
      variant: "notification" as const,
    },
  ];

  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Good Afternoon, {displayName}
        </h2>
        <p className="text-gray-600">Have A Wonderful Day At Work.</p>
      </div>

      <div className="flex w-full gap-4 p-4 pt-0">
        {items.map((item) => (
          <DashboardSummaryCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            variant={item.variant}
          />
        ))}
      </div>
    </div>
  );
}
