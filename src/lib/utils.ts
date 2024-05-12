import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createAvatar, type Style } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import { type User } from "next-auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalise(str: string | undefined | null) {
  if (!str) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const identiconFunction = identicon as Style<{ seed: string }>;

export function getUserImage(user: User) {
  const avatarSvg = createAvatar(identiconFunction, {
    seed: user?.email ?? "random-seed",
  });

  const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg.toString())}`;

  return user.image ?? placeholder;
}
