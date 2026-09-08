import LogOutButton from "@/components/button/loout-button";
import SelectedMonthYear from "./selected-month-year";
import TabsRoutes from "./tabs-routes";

export function NavHeaderBar() {
  return (
    <div className="py-1.5 px-1 md:w-1/2 md:mx-auto sticky top-0 z-10 flex justify-between  gap-2 md:px-4 md:gap-10">
      <LogOutButton />
      <SelectedMonthYear />

      <TabsRoutes />
    </div>
  );
}
