import { getServerAuthSession } from "~/server/auth";
import { capitalise } from "~/lib/utils";

interface OpponentData {
  name: string;
  image: string;
  kills: number;
  price: string;
  points: number;
  placement: number;
}

export async function GET() {
  const session = await getServerAuthSession();

  if (!session || !session.user) return new Response(null, { status: 401 });

  const opponentData: OpponentData[] = [
    {
      name: capitalise(session.user.name)!,
      image: session.user.image!,
      kills: 12,
      price: "499.99",
      points: 25,
      placement: 2,
    },
    {
      name: "Chester",
      image: "/Rick.png",
      kills: 30,
      price: "499.99",
      points: 25,
      placement: 1,
    },
    {
      name: "Giant Robot",
      image: "/Rick.png",
      kills: 17,
      price: "999.99",
      points: 50,
      placement: 10,
    },
    {
      name: "Super Speedy Car",
      image: "/Rick.png",
      kills: 12,
      price: "799.99",
      points: 35,
      placement: 8,
    },
    {
      name: "Hyper Jet",
      image: "/Rick.png",
      kills: 9,
      price: "1299.99",
      points: 75,
      placement: 2,
    },
    {
      name: "Magic Wand",
      image: "/Rick.png",
      kills: 20,
      price: "299.99",
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
