import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import SetReminder from "./components/SetReminder";
import ViewReminder from "./components/ViewReminder";
import { useState } from "react";

const ReminderPage = () => {
  const [activeView, setActiveView] = useState("create-schedule");

  return (
    <Card className="mx-auto my-4 w-full max-w-5xl rounded border-2 p-5">
      <CardContent className="p-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Set Reminder</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 rounded-lg border-2 border-[#9080e0] bg-[#eeecfa] font-medium text-[#9080e0]">
                <Filter size={16} />
                {activeView === "create-schedule"
                  ? "Create Schedule"
                  : "View Reminders"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className={`cursor-pointer ${
                  activeView === "create-schedule"
                    ? "bg-[#eeecfa] text-[#9080e0] hover:bg-[#e0dafa]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveView("create-schedule")}
              >
                Create Schedule
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`cursor-pointer ${
                  activeView === "view"
                    ? "bg-[#eeecfa] text-[#9080e0]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveView("view")}
              >
                View Reminders
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <hr className="mb-4" />
        <div>
          {activeView === "create-schedule" ? (
            <SetReminder />
          ) : (
            <ViewReminder />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReminderPage;
