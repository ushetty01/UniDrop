"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet, CreditCard, Landmark } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function NewDeliveryPage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">New Delivery Request</CardTitle>
              <CardDescription>Fill in the details below to find a courier.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="pickup" 
                          placeholder="e.g., KC Food Court" 
                          className="pl-10"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                        />
                      </div>
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="dropoff">Drop-off Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="dropoff" 
                          placeholder="e.g., Block 5, Room 201" 
                          className="pl-10"
                          value={dropoff}
                          onChange={(e) => setDropoff(e.target.value)}
                        />
                      </div>
                  </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="description">Item Description</Label>
                <Textarea id="description" placeholder="e.g., 1x Aloo Paratha, 1x Coke" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="package-size">Package Size</Label>
                  <Select>
                    <SelectTrigger id="package-size">
                      <SelectValue placeholder="Select a size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (e.g., Food box)</SelectItem>
                      <SelectItem value="medium">Medium (e.g., Book, clothing)</SelectItem>
                      <SelectItem value="large">Large (e.g., Small appliance)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="price">Delivery Fee</Label>
                    <Input id="price" type="number" placeholder="e.g., 50" />
                 </div>
              </div>
               <div className="space-y-2">
                  <Label>Payment Method</Label>
                   <RadioGroup defaultValue="cod" className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                        <Label htmlFor="cod" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <Wallet className="mb-3 h-6 w-6" />
                          Cash
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                        <Label htmlFor="upi" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                           <Landmark className="mb-3 h-6 w-6" />
                          UPI
                        </Label>
                      </div>
                       <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label htmlFor="card" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          <CreditCard className="mb-3 h-6 w-6" />
                          Card
                        </Label>
                      </div>
                  </RadioGroup>
              </div>
              <div>
                <Button asChild className="w-full">
                    <Link href="/delivery/del-123/couriers">Find Couriers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
             <Card>
                 <CardHeader>
                    <CardTitle className="font-headline">Map Preview</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="aspect-video w-full rounded-md overflow-hidden bg-muted relative">
                        <Image src="https://placehold.co/600x400.png" width={600} height={400} alt={pickup && dropoff ? `Route from ${pickup} to ${dropoff}` : "Map preview"} data-ai-hint="map city" className="object-cover w-full h-full" />
                        {pickup && dropoff && (
                           <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-foreground p-4">
                            <MapPin className="w-8 h-8 mb-2 text-primary" />
                            <h3 className="font-semibold text-lg">Route Planned</h3>
                            <p className="text-sm text-muted-foreground">From: <span className="font-medium text-foreground">{pickup}</span></p>
                            <p className="text-sm text-muted-foreground">To: <span className="font-medium text-foreground">{dropoff}</span></p>
                          </div>
                        )}
                    </div>
                 </CardContent>
             </Card>
        </div>
      </div>
    </AppLayout>
  );
}
