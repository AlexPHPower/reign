"use client";

import React, { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import LoadingPricePage from "~/app/(home)/about/loading";
import Tiers from "~/components/pricing/tiers";

export default function Page() {
  return (
    <main>
      <div className="flex h-full min-h-screen w-full flex-col items-center gap-8 p-12">
        <h1 className={`text-6xl`}>Membership Tiers</h1>
        <div className={`flex w-full justify-center`}>
          <p className="w-1/2 text-center text-neutral-400">
            We offer three tiers to match your budget and boost your potential
            winnings. The higher the tier, the more you contribute to the prize
            pool.
          </p>
        </div>
        <Suspense fallback={<LoadingPricePage />}>
          <Tiers />
        </Suspense>
        <div className="w-4/5 space-y-4">
          <h2 className={`space-x-4 text-center text-6xl`}>
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why pay to play?</AccordionTrigger>
              <AccordionContent>
                By paying a monthly subscription you contribute to the prize
                pool and help us maintain Reign for our users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Which tier should i choose?</AccordionTrigger>
              <AccordionContent>
                Personally when it comes to our membership tiers we recommend
                the Lord tier. It offers the best value for money and
                contributes a little more to the prize pool. <br />
                <br />
                The Peasant tier is a great starting point for those who are new
                to Reign and want to try it out. <br />
                <br />
                The King tier is for those who are serious about their gaming
                and want to contribute the most to the prize pool.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What if i miss some games?</AccordionTrigger>
              <AccordionContent>
                Unfortunately we cannot offer refunds for missed games, it is up
                to you to ensure that you show up to play on time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>When are games played?</AccordionTrigger>
              <AccordionContent>
                Your games will always begin at the same time and on the same
                day every week. You will have access to this information in the
                player dashboard.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What if i want to cancel?</AccordionTrigger>
              <AccordionContent>
                You can cancel your subscription at any time and will not lose
                access to the game until the end of the current billing period.
                We encourage players to come back and play with us whenever they
                can.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>What if i forget to cancel?</AccordionTrigger>
              <AccordionContent>
                If you forget to cancel your membership and haven&apos;t yet
                played any games, we will refund your payment in full. As people
                who had a similar experience with a game pass and paid for 3
                years without playing we understand that sometimes you forget to
                cancel.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>When do you payout?</AccordionTrigger>
              <AccordionContent>
                Payouts from the previous league will happen within 14 days of
                the league finishing. This ensures the team has enough time to
                verify the legitimacy of your win, we want to be able to ensure
                that cheating is not possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>How do you payout?</AccordionTrigger>
              <AccordionContent>
                Payouts will be processed via PayPal, you can connect this in
                the user dashboard. Alternative methods will be available in the
                future. Pending winnings will be displayed in the user
                dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
