import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import React from "react";


export default function PayoutsCard() {
    return (
        <Card className="col-span-1 shadow-lg shadow-secondary">
            <CardHeader className="text-2xl font-bold text-primary text-center md:text-left">
                Payouts you can trust
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-neutral-400 text-center md:text-left">
                        League winnings are paid out within 72 hours of the end of the league via PayPal.
                    </p>
                    <Image src="/PaypalLogo.png" alt="Paypal Logo"
                           className="mt-8 mx-auto w-auto h-24"
                           width={100}
                           height={24}/>
                </div>
            </CardContent>
        </Card>
    )
}