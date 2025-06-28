
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
import { useDeliveries } from '@/context/delivery-context';
import { PackageSearch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { vendors } from '@/lib/data';
import type { Delivery } from "@/context/delivery-context";

export default function OrderHistoryPage() {
  const router = useRouter();
  const { deliveries } = useDeliveries();
  const vendor = vendors[0]; // Assuming first vendor is logged in

  const activeDeliveries = deliveries.filter(d => d.status !== 'Delivered' && d.courier?.id === vendor.courier.id);
  const completedDeliveries = deliveries.filter(d => d.status === 'Delivered' && d.courier?.id === vendor.courier.id);
  
  const handleViewDetails = (deliveryId: string) => {
    router.push(`/delivery/${deliveryId}?role=vendor`);
  };

  const renderOrderList = (list: Delivery[], isCompletedSection = false) => {
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
            className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted/50 cursor-pointer"
            onClick={() => handleViewDetails(delivery.id)}
          >
            <div className="flex-grow">
              <p className="font-medium">{delivery.item}</p>
              <p className="text-sm text-muted-foreground">
                To: {delivery.dropoff}
              </p>
            </div>
            <Badge variant={delivery.status === 'Delivered' ? 'secondary' : 'default'} className={delivery.status === 'In Transit' ? 'bg-amber-500' : ''}>{delivery.status}</Badge>
          </div>
        ))}
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">Order History</h1>
          <p className="text-muted-foreground">
            A complete record of all your store's orders.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
            <CardDescription>
              Orders that are currently in transit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderOrderList(activeDeliveries)}
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
            <CardDescription>
              A history of all your fulfilled orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderOrderList(completedDeliveries, true)}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
