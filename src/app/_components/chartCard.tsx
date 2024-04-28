import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import dynamic from "next/dynamic";

const HomeBarChartNoSSR = dynamic(() => import("~/app/_components/barChart"), {
  ssr: false,
});

export default function ExampleChartCard() {
  return (
    <Card className="col-span-1 shadow-lg shadow-secondary">
      <CardContent className="flex flex-col items-center p-4 md:flex-row">
        <div>
          <CardHeader className="text-center text-2xl font-bold text-white md:text-left">
            Fully interactive performance{" "}
            <span className="font-extrabold text-primary">charts</span>
          </CardHeader>
          <p className="ml-6 text-center text-neutral-400 md:text-left">
            Customise your dashboard and improve your performance with our
            reporting tools.
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:w-1/2">
          <HomeBarChartNoSSR />
        </div>
      </CardContent>
    </Card>
  );
}
