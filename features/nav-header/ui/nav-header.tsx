import LogoutButton from "@/components/button/logout-button";
import MonthYearPicker from "./month-year-picker";

export function NavHeader() {
  return (
    <div className="sticky top-0 z-10 flex justify-between gap-2 px-3 py-2">
      <LogoutButton />
      <MonthYearPicker />
    </div>
  );
}
