import HeroSection from "~/components/heroSection";
import LeaderboardSection from "~/components/leaderboardSection";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <LeaderboardSection />
    </main>
  );
}
