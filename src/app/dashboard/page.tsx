import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Active League</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Kills</TableHead>
                      <TableHead>Games Played</TableHead>
                      <TableHead>Highest Placement</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Points
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Laser Lemonade Machine
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Draft</Badge>
                      </TableCell>
                      <TableCell>$499.99</TableCell>
                      <TableCell className="hidden md:table-cell">25</TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-07-12 10:42 AM
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Hypernova Headphones
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell>$129.99</TableCell>
                      <TableCell className="hidden md:table-cell">
                        100
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-10-18 03:21 PM
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        AeroGlow Desk Lamp
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell>$39.99</TableCell>
                      <TableCell className="hidden md:table-cell">50</TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-11-29 08:15 AM
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        TechTonic Energy Drink
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Draft</Badge>
                      </TableCell>
                      <TableCell>$2.99</TableCell>
                      <TableCell className="hidden md:table-cell">0</TableCell>
                      <TableCell className="hidden md:table-cell">
                        2023-12-25 11:59 PM
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Gamer Gear Pro Controller
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell>$59.99</TableCell>
                      <TableCell className="hidden md:table-cell">75</TableCell>
                      <TableCell className="hidden md:table-cell">
                        2024-01-01 12:00 AM
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src="/placeholder.svg"
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        Luminous VR Headset
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Active</Badge>
                      </TableCell>
                      <TableCell>$199.99</TableCell>
                      <TableCell className="hidden md:table-cell">30</TableCell>
                      <TableCell className="hidden md:table-cell">
                        2024-02-14 02:14 PM
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
