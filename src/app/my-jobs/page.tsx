
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
import type { Delivery } from "@/context/delivery-context";

export default function MyJobsPage() {
  const router = useRouter();
  const { deliveries } = useDeliveries();

  const activeJobs = deliveries.filter(
    (d) => d.status === "In Transit" && d.courier?.id === 'courier-user'
  );
  
  const completedJobs = deliveries.filter(
    (d) => d.status === "Delivered" && d.courier?.id === 'courier-user'
  );

  const handleViewDetails = (deliveryId: string) => {
    router.push(`/delivery/${deliveryId}?role=courier`);
  };

  const renderJobList = (list: Delivery[], isCompletedSection = false) => {
    if (list.length === 0) {
      return (
        <div className="py-8 text-center text-muted-foreground">
          <PackageSearch className="mx-auto h-12 w-12" />
          <p className="mt-4">
            {isCompletedSection
              ? "You haven't completed any jobs yet."
              : "You don't have any active jobs right now."}
          </p>
          {!isCompletedSection && (
             <Button asChild className="mt-4">
                <Link href="/dashboard?role=courier">Find a Job</Link>
            </Button>
          )}
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {list.map((delivery) => (
          <div
            key={delivery.id}
            className="flex cursor-pointer items-center justify-between rounded-lg p-3 hover:bg-muted/50"
            onClick={() => handleViewDetails(delivery.id)}
          >
            <div className="flex-grow">
              <p className="font-medium">{delivery.item}</p>
              <p className="text-sm text-muted-foreground">
                From: {delivery.pickup} | To: {delivery.dropoff}
              </p>
            </div>
            <Badge
                variant={delivery.status === 'Delivered' ? 'secondary' : 'default'}
                className={delivery.status === 'In Transit' ? 'bg-amber-500' : ''}
            >
                {delivery.status}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">My Jobs</h1>
          <p className="text-muted-foreground">
            View your active and completed jobs here.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Jobs</CardTitle>
            <CardDescription>
              Deliveries that you are currently handling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderJobList(activeJobs)}
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Completed Jobs</CardTitle>
            <CardDescription>
              A history of all the deliveries you've successfully completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderJobList(completedJobs, true)}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
