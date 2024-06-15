import HeroSection from "~/components/home/heroSection";
import PlayerProfileSection from "~/components/home/playerProfileSection";
import CommunitySection from "~/components/home/communitySection";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <PlayerProfileSection />
      <CommunitySection />
    </main>
  );
}
