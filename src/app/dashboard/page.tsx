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
import { Activity, CheckCircle, PackagePlus, PackageSearch } from "lucide-react";
import { deliveries } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage({ searchParams }: { searchParams?: { role?: string } }) {
  const role = searchParams?.role || 'customer';
  const isCourier = role === 'courier';

  let activeList, completedList, activityList;

  if (isCourier) {
    activeList = deliveries.filter(d => d.status === 'In Transit');
    completedList = deliveries.filter(d => d.status === 'Delivered');
    activityList = deliveries.filter(d => d.status === 'Pending Pickup');
  } else {
    // For customers, show all their deliveries
    activeList = deliveries.filter(d => d.status !== 'Delivered');
    completedList = deliveries.filter(d => d.status === 'Delivered');
    activityList = deliveries;
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">{isCourier ? "Courier Dashboard" : "Dashboard"}</h1>
          <p className="text-muted-foreground">
            {isCourier ? "Welcome back! Find and manage your delivery jobs here." : "Welcome back! Here's an overview of your deliveries."}
          </p>
        </div>

        <div className={`grid gap-4 md:grid-cols-2 ${isCourier ? '' : 'lg:grid-cols-3'}`}>
          <Card className="flex flex-col">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isCourier ? 'Assigned Jobs' : 'Active Deliveries'}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeList.length}</div>
              <p className="text-xs text-muted-foreground">
                 {isCourier ? 'Jobs currently in progress.' : 'Deliveries currently in progress.'}
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed {isCourier ? 'Jobs' : 'Deliveries'}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedList.length}</div>
              <p className="text-xs text-muted-foreground">
                Total {isCourier ? 'jobs' : 'deliveries'} successfully completed.
              </p>
            </CardContent>
          </Card>
           {!isCourier && (
            <Card className="col-span-full lg:col-span-1 bg-primary text-primary-foreground flex flex-col justify-center">
              <CardContent className="pt-6">
                  <Link href="/delivery/new">
                      <Button variant="secondary" className="w-full">
                          <PackagePlus className="mr-2 h-4 w-4" />
                          Create New Delivery
                      </Button>
                  </Link>
              </CardContent>
            </Card>
           )}
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{isCourier ? "Available Delivery Requests" : "Recent Activity"}</CardTitle>
                <CardDescription>{isCourier ? "Pick up a job from the list below." : "An overview of your recent deliveries."}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activityList.map((delivery) => (
                        <div key={delivery.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <p className="font-medium">{delivery.item}</p>
                                <p className="text-sm text-muted-foreground">{isCourier ? `From: ${delivery.pickup} | To: ${delivery.dropoff}` : `To: ${delivery.dropoff}`}</p>
                            </div>
                             {isCourier ? (
                                <Button size="sm" asChild>
                                  <Link href={`/delivery/${delivery.id}?role=courier`}>Accept Job</Link>
                                </Button>
                              ) : (
                                <Badge variant={delivery.status === 'Delivered' ? 'secondary' : 'default'} className={delivery.status === 'In Transit' ? 'bg-amber-500' : ''}>{delivery.status}</Badge>
                              )}
                        </div>
                    ))}
                    {isCourier && activityList.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            <PackageSearch className="mx-auto h-12 w-12" />
                            <p className="mt-4">No available jobs at the moment. Check back later!</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
