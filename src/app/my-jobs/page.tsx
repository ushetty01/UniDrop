'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDeliveries } from "@/context/delivery-context";
import { PackageSearch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MyJobsPage() {
  const router = useRouter();
  const { deliveries } = useDeliveries();

  const activeJobs = deliveries.filter(
    (d) => d.status === "In Transit" && d.courier
  );

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">My Active Jobs</h1>
          <p className="text-muted-foreground">
            Here are the deliveries you are currently handling.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>In-Progress Deliveries</CardTitle>
            <CardDescription>
              Click on a job to view its details and complete the delivery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((delivery) => (
                <div
                  key={delivery.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-muted/50"
                  onClick={() =>
                    router.push(`/delivery/${delivery.id}?role=courier`)
                  }
                >
                  <div className="flex-grow">
                    <p className="font-medium">{delivery.item}</p>
                    <p className="text-sm text-muted-foreground">
                      From: {delivery.pickup} | To: {delivery.dropoff}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="default"
                      className="bg-amber-500 hover:bg-amber-600"
                    >
                      {delivery.status}
                    </Badge>
                    <Button size="sm" variant="outline" asChild>
                       <Link href={`/delivery/${delivery.id}?role=courier`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <div className="py-8 text-center text-muted-foreground">
                  <PackageSearch className="mx-auto h-12 w-12" />
                  <p className="mt-4">
                    You don&apos;t have any active jobs right now.
                  </p>
                   <Button asChild className="mt-4">
                      <Link href="/dashboard?role=courier">Find a Job</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
