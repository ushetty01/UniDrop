
"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Wallet, CreditCard, Landmark, Map, Users, Building, Plus, Minus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDeliveries } from '@/context/delivery-context';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { generateMapImage } from '@/ai/flows/generate-map-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { vendors } from '@/lib/data';

const mockLocations = [
    "KC Food Court",
    "MIT Central Library",
    "Block 5, Room 201",
    "Block 17, Room 404",
    "Student Plaza",
    "Night Canteen",
    "Campus Store"
];

export default function NewDeliveryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addDelivery, addVendorDelivery } = useDeliveries();
  const { toast } = useToast();

  // Location state
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [editingLocation, setEditingLocation] = useState<'pickup' | 'dropoff' | null>(null);

  // Delivery details state
  const [deliveryType, setDeliveryType] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [packageSize, setPackageSize] = useState('');

  // Standard P2P delivery state
  const [standardDeliveryDescription, setStandardDeliveryDescription] = useState('');
  const [deliveryFee, setDeliveryFee] = useState('');
  
  // Vendor delivery state
  const [selectedVendor, setSelectedVendor] = useState('');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  
  // Shared / Calculated state
  const [totalPrice, setTotalPrice] = useState('');
  const [mapImageUrl, setMapImageUrl] = useState("https://placehold.co/600x400.png");
  const [isMapLoading, setIsMapLoading] = useState(false);

  const role = searchParams.get('role');
  const dashboardLink = `/dashboard${role ? `?role=${role}` : ''}`;
  
  const selectedVendorData = vendors.find(v => v.id === selectedVendor);

  // Effect to update map
  useEffect(() => {
    const finalPickup = deliveryType === 'vendor' ? vendors.find(v => v.id === selectedVendor)?.name : pickup;
    if (finalPickup && dropoff) {
      const handler = setTimeout(() => {
        setIsMapLoading(true);
        generateMapImage({ pickup: finalPickup, dropoff })
          .then(result => setMapImageUrl(result.mapDataUri))
          .catch(error => {
            console.error("Failed to generate map:", error);
            setMapImageUrl("https://placehold.co/600x400.png");
          })
          .finally(() => setIsMapLoading(false));
      }, 1000);
      return () => clearTimeout(handler);
    }
  }, [pickup, dropoff, deliveryType, selectedVendor]);
  
  // Effect to set pickup location from vendor
  useEffect(() => {
    if (deliveryType === 'vendor' && selectedVendor) {
      const vendorName = vendors.find(v => v.id === selectedVendor)?.name;
      if (vendorName) setPickup(vendorName);
    } else {
      setPickup('');
    }
  }, [deliveryType, selectedVendor]);

  // Effect to calculate vendor order total
  useEffect(() => {
      if (deliveryType === 'vendor' && selectedVendorData) {
          const vendorMenu = selectedVendorData.menu || [];
          const itemTotal = Object.entries(selectedItems).reduce((acc, [itemId, quantity]) => {
              const item = vendorMenu.find(i => i.id === itemId);
              return acc + (item ? item.price * quantity : 0);
          }, 0);

          const calculatedDeliveryFee = itemTotal > 0 ? 30 : 0; // Only add delivery fee if items are selected
          setTotalPrice((itemTotal + calculatedDeliveryFee).toString());
      }
  }, [selectedItems, deliveryType, selectedVendorData]);

  // Effect to reset state when delivery type changes
  useEffect(() => {
      setStandardDeliveryDescription('');
      setDeliveryFee('');
      setSelectedItems({});
      setSelectedVendor('');
      setTotalPrice('');
      setPackageSize('');
  }, [deliveryType]);


  const handleQuantityChange = (itemId: string, change: number) => {
      setSelectedItems(prev => {
          const currentQuantity = prev[itemId] || 0;
          const newQuantity = Math.max(0, currentQuantity + change);
          if (newQuantity === 0) {
              const newItems = {...prev};
              delete newItems[itemId];
              return newItems;
          }
          return {
              ...prev,
              [itemId]: newQuantity
          };
      });
  };

  const handleSubmit = () => {
    const finalPickup = deliveryType === 'vendor' ? selectedVendorData?.name : pickup;
    
    let finalDescription = '';
    if(deliveryType === 'vendor') {
      const vendorMenu = selectedVendorData?.menu || [];
      finalDescription = vendorMenu
          .filter(item => selectedItems[item.id] > 0)
          .map(item => `${selectedItems[item.id]}x ${item.name}`)
          .join(', ');
    } else {
      finalDescription = standardDeliveryDescription;
    }

    const finalPrice = deliveryType === 'vendor' ? totalPrice : deliveryFee;

    if (!finalPickup || !dropoff || !finalDescription || !finalPrice || !paymentMethod) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill out all required fields." });
      return;
    }

    const deliveryData = {
      item: finalDescription,
      pickup: finalPickup,
      dropoff,
      price: Number(finalPrice),
      paymentMethod,
      mapImageUrl,
    };

    if (deliveryType === 'standard') {
      addDelivery(deliveryData);
      toast({ title: "Delivery Request Submitted!", description: "Your request has been sent to available couriers." });
    } else {
      addVendorDelivery(deliveryData, selectedVendor);
      toast({ title: "Order Placed!", description: `Your order has been placed with ${finalPickup}.` });
    }
    
    router.push(dashboardLink);
  };
  
  const handleSelectLocation = (location: string) => {
    if (editingLocation === 'pickup') {
      setPickup(location);
    } else if (editingLocation === 'dropoff') {
      setDropoff(location);
    }
    setEditingLocation(null);
  };

  const itemTotalForDisplay = deliveryType === 'vendor' && totalPrice ? (Number(totalPrice) > 0 ? Number(totalPrice) - 30 : 0) : 0;
  const deliveryFeeForDisplay = deliveryType === 'vendor' && itemTotalForDisplay > 0 ? 30 : 0;

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">New Delivery Request</CardTitle>
              <CardDescription>Fill in the details below to place an order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Delivery Type</Label>
                <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                    <Label htmlFor="standard" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <Users className="mb-3 h-6 w-6" />
                      Standard P2P
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="vendor" id="vendor" className="peer sr-only" />
                    <Label htmlFor="vendor" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <Building className="mb-3 h-6 w-6" />
                      From a Vendor
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {deliveryType === 'vendor' ? (
                // VENDOR DELIVERY FORM
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="vendor-select">Vendor</Label>
                        <Select onValueChange={setSelectedVendor} value={selectedVendor}>
                            <SelectTrigger id="vendor-select"><SelectValue placeholder="Choose a vendor..." /></SelectTrigger>
                            <SelectContent>{vendors.map(vendor => <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="dropoff">Drop-off Location</Label>
                        <div className="flex items-center gap-2">
                            <div className="relative flex-grow">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input id="dropoff" placeholder="e.g., Block 5, Room 201" className="pl-10" value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
                            </div>
                            <Button variant="outline" size="icon" onClick={() => setEditingLocation('dropoff')}><Map className="h-4 w-4" /><span className="sr-only">Select on map</span></Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Select Items</Label>
                        <Card className="max-h-64 overflow-y-auto">
                            <CardContent className="p-4 space-y-3">
                            {selectedVendorData?.menu ? (
                                selectedVendorData.menu.map(item => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">₹{item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, -1)} disabled={(selectedItems[item.id] || 0) === 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="font-bold w-4 text-center">{selectedItems[item.id] || 0}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.id, 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    </div>
                                </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-sm text-center py-4">
                                {selectedVendor ? "This vendor has no items." : "Select a vendor to see their menu."}
                                </p>
                            )}
                            </CardContent>
                        </Card>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="price">Total Cost</Label>
                        <Input id="price" value={totalPrice} readOnly placeholder="0" className="font-bold" />
                        {Number(totalPrice) > 0 && (
                        <p className="text-xs text-muted-foreground">
                            Item Total: ₹{itemTotalForDisplay} + Delivery Fee: ₹{deliveryFeeForDisplay}
                        </p>
                        )}
                    </div>
                </div>
              ) : (
                // STANDARD P2P DELIVERY FORM
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pickup">Pickup Location</Label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="pickup" placeholder="e.g., KC Food Court" className="pl-10" value={pickup} onChange={(e) => setPickup(e.target.value)} />
                                </div>
                                <Button variant="outline" size="icon" onClick={() => setEditingLocation('pickup')}><Map className="h-4 w-4" /><span className="sr-only">Select on map</span></Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dropoff">Drop-off Location</Label>
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input id="dropoff" placeholder="e.g., Block 5, Room 201" className="pl-10" value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
                                </div>
                                <Button variant="outline" size="icon" onClick={() => setEditingLocation('dropoff')}><Map className="h-4 w-4" /><span className="sr-only">Select on map</span></Button>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Item Description</Label>
                        <Textarea id="description" placeholder="e.g., 1x Aloo Paratha, 1x Coke" value={standardDeliveryDescription} onChange={(e) => setStandardDeliveryDescription(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="package-size">Package Size</Label>
                        <Select onValueChange={setPackageSize} value={packageSize}>
                            <SelectTrigger id="package-size"><SelectValue placeholder="Select a size" /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="small">Small (e.g., Food box)</SelectItem>
                            <SelectItem value="medium">Medium (e.g., Book, clothing)</SelectItem>
                            <SelectItem value="large">Large (e.g., Small appliance)</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="price">Delivery Fee Offer</Label>
                        <Input id="price" type="number" placeholder="e.g., 50" value={deliveryFee} onChange={(e) => setDeliveryFee(e.target.value)} />
                        </div>
                    </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="Cash" id="cod" className="peer sr-only" />
                    <Label htmlFor="cod" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"><Wallet className="mb-3 h-6 w-6" />Cash</Label>
                  </div>
                  <div>
                    <RadioGroupItem value="UPI" id="upi" className="peer sr-only" />
                    <Label htmlFor="upi" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"><Landmark className="mb-3 h-6 w-6" />UPI</Label>
                  </div>
                  <div>
                    <RadioGroupItem value="Card" id="card" className="peer sr-only" />
                    <Label htmlFor="card" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"><CreditCard className="mb-3 h-6 w-6" />Card</Label>
                  </div>
                </RadioGroup>
              </div>
              <div><Button onClick={handleSubmit} className="w-full">Submit Delivery Request</Button></div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
             <Card>
                 <CardHeader><CardTitle className="font-headline">Map Preview</CardTitle></CardHeader>
                 <CardContent>
                    <div className="aspect-video w-full rounded-md overflow-hidden bg-muted relative">
                        {isMapLoading ? <Skeleton className="w-full h-full" /> : <Image src={mapImageUrl} width={600} height={400} alt={pickup && dropoff ? `Route from ${pickup} to ${dropoff}` : "Map preview"} data-ai-hint="map city" className="object-cover w-full h-full" unoptimized />}
                        {pickup && dropoff && !isMapLoading && (
                           <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-primary-foreground p-4">
                            <MapPin className="w-8 h-8 mb-2 text-primary" />
                            <h3 className="font-semibold text-lg">Route Planned</h3>
                            <p className="text-sm text-muted-foreground">From: <span className="font-medium text-primary-foreground">{pickup}</span></p>
                            <p className="text-sm text-muted-foreground">To: <span className="font-medium text-primary-foreground">{dropoff}</span></p>
                          </div>
                        )}
                    </div>
                 </CardContent>
             </Card>
        </div>
      </div>
      <Dialog open={!!editingLocation} onOpenChange={(isOpen) => !isOpen && setEditingLocation(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Select {editingLocation === 'pickup' ? 'Pickup' : 'Drop-off'} Location</DialogTitle>
            <DialogDescription>Click a location from the list below to select it.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted">
                  <Image src="https://placehold.co/400x400.png" alt="Map of campus" fill style={{objectFit: 'cover'}} data-ai-hint="map campus"/>
              </div>
              <div className="space-y-2">
                  <h4 className="font-medium">Popular Locations</h4>
                  <div className="flex flex-col gap-2">
                      {mockLocations.map(loc => <Button key={loc} variant="ghost" className="justify-start" onClick={() => handleSelectLocation(loc)}><MapPin className="mr-2 h-4 w-4" />{loc}</Button>)}
                  </div>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
