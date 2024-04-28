import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";


export default function StatsCard() {
    return (
        <Card className="col-span-2 shadow-lg shadow-secondary">
            <CardHeader className="text-2xl font-bold text-white text-center md:text-left">
                Stats for every <span className="text-primary font-extrabold">game</span>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-neutral-400 text-center md:text-left">
                        Track your stats from every game, improve by analyzing your performance, and get paid out.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}