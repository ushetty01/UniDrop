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
import { Activity, CheckCircle, PackagePlus, PlusCircle } from "lucide-react";
import { deliveries } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const activeDeliveries = deliveries.filter(d => d.status !== 'Delivered');

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your deliveries.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Deliveries
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">
                Deliveries currently in progress.
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Deliveries
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deliveries.length - activeDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">
                Total deliveries successfully completed.
              </p>
            </CardContent>
          </Card>
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
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>An overview of your recent deliveries.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {deliveries.map((delivery) => (
                        <div key={delivery.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                            <div>
                                <p className="font-medium">{delivery.item}</p>
                                <p className="text-sm text-muted-foreground">To: {delivery.dropoff}</p>
                            </div>
                            <Badge variant={delivery.status === 'Delivered' ? 'secondary' : 'default'} className={delivery.status === 'In Transit' ? 'bg-amber-500' : ''}>{delivery.status}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
