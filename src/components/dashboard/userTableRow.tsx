"use client";

import { TableCell, TableRow } from "~/components/ui/table";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import * as React from "react";
import { getUserImage } from "~/lib/utils";
import { type User } from "next-auth";

interface UserTableRowProps {
  user: User;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user }) => {
  const image = getUserImage(user);

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="rounded-full object-cover"
          height="44"
          src={image}
          width="44"
        />
      </TableCell>
      <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
      <TableCell>12</TableCell>
      <TableCell>$499.99</TableCell>
      <TableCell className="hidden md:table-cell">25</TableCell>
      <TableCell className="hidden md:table-cell">12</TableCell>
    </TableRow>
  );
};

export default UserTableRow;
