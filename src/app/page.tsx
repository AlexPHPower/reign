import HeroSection from "~/app/_components/heroSection";
import PayoutsCard from "~/app/_components/payoutsCard";
import ExampleTableCard from "~/app/_components/exampleTableCard";
import StatsCard from "~/app/_components/statsCard";
import DiscordCard from "~/app/_components/discordCard";
import MonthlyFeeCard from "~/app/_components/monthlyFeeCard";
import ExampleChartCard from "~/app/_components/chartCard";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <div className="mx-auto mb-20 max-w-4xl">
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <PayoutsCard />
          <ExampleTableCard />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <StatsCard />
          <DiscordCard />
          <MonthlyFeeCard />
        </div>
        <div className="mt-5 grid hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:block lg:grid-cols-4">
          <ExampleChartCard />
        </div>
      </div>
    </main>
  );
}
