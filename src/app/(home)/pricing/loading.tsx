import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingTierCard() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
    </div>
  );
}
