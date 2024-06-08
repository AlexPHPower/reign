import HeroSection from "~/components/heroSection";
import PlayerProfileSection from "~/components/playerProfileSection";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <PlayerProfileSection />
    </main>
  );
}
