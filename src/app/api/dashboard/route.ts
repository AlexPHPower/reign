import { getServerAuthSession } from "~/server/auth";
import { capitalise, getUserImage } from "~/lib/utils";

interface OpponentData {
  name: string;
  image: string;
  kills: number;
  played: number;
  points: number;
  placement: number;
}

export async function GET() {
  const session = await getServerAuthSession();

  if (!session || !session.user) return new Response(null, { status: 401 });
  const userImage = getUserImage(session.user);

  const opponentData: OpponentData[] = [
    {
      name: capitalise(session.user.name)!,
      image: userImage,
      kills: 12,
      played: 6,
      points: 25,
      placement: 2,
    },
    {
      name: "Chester",
      image: "/Rick.png",
      kills: 30,
      played: 6,
      points: 25,
      placement: 1,
    },
    {
      name: "Giant Robot",
      image: "/Rick.png",
      kills: 17,
      played: 6,
      points: 50,
      placement: 10,
    },
    {
      name: "Super Speedy Car",
      image: "/Rick.png",
      kills: 12,
      played: 6,
      points: 35,
      placement: 8,
    },
    {
      name: "Hyper Jet",
      image: "/Rick.png",
      kills: 9,
      played: 6,
      points: 75,
      placement: 2,
    },
    {
      name: "Magic Wand",
      image: "/Rick.png",
      kills: 20,
      played: 6,
      points: 15,
      placement: 4,
    },
  ];

  return new Response(
    JSON.stringify({
      data: opponentData,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
