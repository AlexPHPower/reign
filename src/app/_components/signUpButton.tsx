import { signOut, useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { createAvatar, type Style } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  CreditCard,
  Keyboard,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";

const identiconFunction = identicon as Style<{ seed: string }>;

export default function SignUpButton() {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    const avatarSvg = createAvatar(identiconFunction, {
      seed: session?.user?.email ?? "random-seed",
    });

    const placeholder = `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg.toString())}`;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="mt-4 block px-4 py-2 lg:mt-0 lg:inline-block">
            <Image
              src={session?.user?.image ?? placeholder}
              alt="User Image"
              className="rounded-full"
              width={44}
              height={44}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={() => signOut()}
              className="inline-flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
