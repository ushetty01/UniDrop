
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/app-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDeliveries } from '@/context/delivery-context';
import { PackageSearch, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from "@/hooks/use-toast";

export default function MyOrdersPage() {
  const router = useRouter();
  const { deliveries, cancelOrder } = useDeliveries();
  const { toast } = useToast();

  // In a real app, we'd filter by a customer ID. For this mock, we show all.
  const myDeliveries = deliveries;

  const activeDeliveries = myDeliveries.filter(d => d.status !== 'Delivered');
  const completedDeliveries = myDeliveries.filter(d => d.status === 'Delivered');

  const handleCancelOrder = (deliveryId: string) => {
    cancelOrder(deliveryId);
    toast({
      title: "Order Cancelled",
      description: "Your delivery request has been successfully cancelled.",
    });
  };

  const renderDeliveryList = (list: typeof myDeliveries, isCompletedSection = false) => {
    if (list.length === 0) {
      return (
        <div className="text-center text-muted-foreground py-8">
            <PackageSearch className="mx-auto h-12 w-12" />
            <p className="mt-4">{isCompletedSection ? "No completed orders yet." : "You have no active orders."}</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {list.map((delivery) => (
          <div
            key={delivery.id}
            className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex-grow cursor-pointer" onClick={() => router.push(`/delivery/${delivery.id}?role=customer`)}>
              <p className="font-medium">{delivery.item}</p>
              <p className="text-sm text-muted-foreground">
                To: {delivery.dropoff}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={delivery.status === 'Delivered' ? 'secondary' : 'default'} className={delivery.status === 'In Transit' ? 'bg-amber-500' : ''}>{delivery.status}</Badge>
              {delivery.status === 'Pending Pickup' && (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button size="sm" variant="destructive">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently cancel your delivery request.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Dismiss</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleCancelOrder(delivery.id)}>
                            Yes, Cancel Order
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">My Orders</h1>
          <p className="text-muted-foreground">
            View and manage your delivery requests here.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>
              Deliveries that are pending or in transit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderDeliveryList(activeDeliveries)}
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
            <CardDescription>
              A history of your past deliveries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderDeliveryList(completedDeliveries, true)}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
