import React from "react";
import { HeroEmailForm } from "~/app/_components/heroEmailForm";

export default function HeroSection() {
  return (
    <div className="relative flex min-h-screen items-center justify-center text-center">
      <video
        className="absolute left-0 top-0 z-0 h-full w-full object-cover blur-sm"
        autoPlay
        loop
        muted
      >
        <source
          src="https://media.contentapi.ea.com/content/dam/apex-legends/videos/2020/05/video-backgrounds/kings-canyon/apex-video-background-download-kings-canyon-11.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="bg-background absolute left-0 top-0 z-10 h-full w-full opacity-80"></div>
      <div className="relative z-10">
        <h2 className="text-5xl font-extrabold tracking-wider text-white">
          Welcome to <span className="text-primary">Reign.</span>
        </h2>
        <HeroEmailForm />
        <p className="italic tracking-wider text-white">
          Join a community where passion meets competition, our esports league
          is the battleground where legends are made.
        </p>
      </div>
    </div>
  );
}
