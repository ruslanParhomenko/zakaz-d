import { ActionFooterBar } from "@/features/action-footer-bar";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ActionFooterBar />;
    </Suspense>
  );
}
