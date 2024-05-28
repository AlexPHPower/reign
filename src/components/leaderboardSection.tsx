import { teko } from "~/lib/utils";
import ScrollingHomeCard from "~/components/scrollingHomeCard";

export default function LeaderboardSection() {
  const cards = ["Card 1", "Card 2", "Card 3", "Card 4", "Card 5"];

  return (
    <div className="mx-auto mb-20 w-full max-w-4xl">
      <div className="flex flex-nowrap items-center justify-center">
        <div
          className={`text-3xl font-semibold uppercase text-white lg:text-4xl ${teko.className}`}
        >
          Display your <span className="text-primary">Achievements</span>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        <p className="text-center text-neutral-400">
          Just like your apex banner, show off your achievements to the world.
        </p>
      </div>
      <div className="mt-5 w-full">
        <ScrollingHomeCard cards={cards} />
      </div>
    </div>
  );
}
