import { signOut, useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";

export default function SignUpButton() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    const avatarSvg = createAvatar(style, {
      seed: session?.user?.email ?? "random-seed",
    });

    const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg)}`;

    console.log(placeholder);
    return (
      <button
        onClick={() => signOut()}
        className="mt-4 block px-4 py-2 underline-offset-4 hover:underline lg:mt-0 lg:inline-block"
      >
        <Image
          src={session?.user?.image ?? placeholder}
          alt="User Image"
          className="rounded-full"
          width={44}
          height={44}
        />
      </button>
    );
  } else {
    return (
      <button
        onClick={() => signIn()}
        className="mt-4 block px-4 py-2 underline-offset-4 hover:underline lg:mt-0 lg:inline-block"
      >
        Sign In
      </button>
    );
  }
}
