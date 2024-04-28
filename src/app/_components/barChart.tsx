"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Game 1",
    Kills: 7,
  },
  {
    name: "Game 2",
    Kills: 12,
  },
  {
    name: "Game 3",
    Kills: 3,
  },
  {
    name: "Game 4",
    Kills: 0,
  },
  {
    name: "Game 5",
    Kills: 10,
  },
  {
    name: "Game 6",
    Kills: 9,
  },
];

export default function HomeBarChart() {
  return (
    <BarChart width={400} height={300} data={data} className="mx-auto py-5">
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="Kills" fill="#8884d8" />
    </BarChart>
  );
}
