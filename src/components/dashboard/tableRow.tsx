import * as React from "react";
import { TableCell, TableRow } from "~/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";

interface TableData {
  name: string;
  image: string;
  kills: number;
  played: number;
  points: number;
  placement: number;
}

interface ApiResponse {
  data: TableData[];
}

export default function TableRows() {
  const [tableData, setTableData] = useState<TableData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/dashboard");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseJson = (await res.json()) as ApiResponse;
      const data: TableData[] = responseJson.data;
      setTableData(data);
    }

    fetchData().catch(console.error);
  }, []);

  if (!tableData) {
    const skeletonArray = Array.from({ length: 5 });

    return (
      <>
        {skeletonArray.map((_, index) => (
          <TableRow key={index}>
            <TableCell className="hidden sm:table-cell">
              <Skeleton className="h-11 w-11 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-24 rounded-2xl" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-16 rounded-2xl" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-12 rounded-2xl" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-8 rounded-2xl" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-20 rounded-2xl" />
            </TableCell>
          </TableRow>
        ))}
      </>
    );
  }

  return (
    <>
      {tableData.map((opponent, index) => (
        <TableRow key={index}>
          <TableCell className="hidden sm:table-cell">
            <Image
              alt="Product image"
              className="rounded-full object-cover"
              height="44"
              src={opponent.image}
              width="44"
            />
          </TableCell>
          <TableCell className="font-medium">{opponent.name}</TableCell>
          <TableCell>{opponent.kills}</TableCell>
          <TableCell>{opponent.played}</TableCell>
          <TableCell className="hidden md:table-cell">
            {opponent.placement}
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {opponent.points}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
