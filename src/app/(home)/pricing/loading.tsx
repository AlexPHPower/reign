import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

export default function LoadingTierCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
      <Skeleton className="h-[506px] w-[318.93px] rounded-xl" />
    </div>
  );
}
