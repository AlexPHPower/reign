import { type ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/components/ui/menubar";
import Link from "next/link";

interface DropdownMenuProps {
  children: ReactNode;
}

export function NavigationMenuSettings(props: DropdownMenuProps) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className={`data-[state=open]:bg-accent`}>
          {props.children}
        </MenubarTrigger>
        <MenubarContent>
          <Link href="/dashboard/settings/account">
            <MenubarItem className={`cursor-pointer`}>
              Profile Settings
            </MenubarItem>
          </Link>
          <Link href="/dashboard/settings/subscribe">
            <MenubarItem className={`cursor-pointer`}>
              Plan and Billing
            </MenubarItem>
          </Link>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
