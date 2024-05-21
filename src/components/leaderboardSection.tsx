import { teko } from "~/lib/utils";
import { AnimatedDiv } from "~/components/homepageAnimatedDiv";
import Image from "next/image";

export default function LeaderboardSection() {
  return (
    <div className="mx-auto mb-20 max-w-4xl">
      <div className="flex flex-nowrap items-center justify-center">
        <div
          className={`font-semibold uppercase text-white lg:text-4xl ${teko.className}`}
        >
          Win Like a <span className="text-primary">Champion</span>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-center">
        <p className="text-neutral-400">
          League winnings are paid out within 72 hours of the end of the league
          via PayPal.
        </p>
      </div>
      <div className="mt-20 space-y-20">
        <div className="flex justify-start">
          <AnimatedDiv>
            <div className={`${teko.className} flex flex-grow justify-center`}>
              1
            </div>
            <Image
              src="/wraith.png"
              alt="Apex Legends Wraith"
              height="32"
              width="128"
              className="ml-auto"
            />
          </AnimatedDiv>
        </div>
        <div className="flex justify-center">
          <AnimatedDiv>
            {" "}
            <div className={`${teko.className} flex flex-grow justify-center`}>
              2
            </div>
            <Image
              src="/Wattson.png"
              alt="Apex Legends Wraith"
              height="32"
              width="128"
              className="ml-auto"
            />
          </AnimatedDiv>
        </div>
        <div className="flex justify-end">
          <AnimatedDiv>
            <div className={`${teko.className} flex flex-grow justify-center`}>
              3
            </div>
            <Image
              src="/Valk.png"
              alt="Apex Legends Wraith"
              height="32"
              width="128"
              className="ml-auto"
            />
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}
