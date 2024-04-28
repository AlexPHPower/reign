import {Card, CardContent, CardHeader} from "@/components/ui/card";
import React from "react";


export default function MonthlyFeeCard() {
    return (
        <Card className="col-span-2 shadow-lg shadow-secondary">
            <CardHeader className="text-2xl font-bold text-white text-center md:text-left">
                Monthly subscription
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-neutral-400 text-center md:text-left">
                        Your subscription will be added to a pool of prize money, stop and start anytime. <br/><br/>£10 per month.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}