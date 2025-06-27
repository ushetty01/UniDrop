import Image from "next/image";
import { deliveries } from "@/lib/data";
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, QrCode, Share2, Send, Wallet, CreditCard, Landmark } from "lucide-react";

const paymentIcons: Record<string, React.ReactNode> = {
    "Cash": <Wallet className="w-4 h-4 mr-2" />,
    "UPI": <Landmark className="w-4 h-4 mr-2" />,
    "Card": <CreditCard className="w-4 h-4 mr-2" />,
}

export default function DeliveryStatusPage({ params }: { params: { id: string } }) {
  const delivery = deliveries.find(d => d.id === 'del-1'); // Mocking with first delivery with courier
  if (!delivery || !delivery.courier) return (
    <AppLayout>
      <p>Delivery not found or no courier assigned.</p>
    </AppLayout>
  );
  
  const { courier } = delivery;
  const paymentIcon = delivery.paymentMethod ? paymentIcons[delivery.paymentMethod] : null;

  return (
    <AppLayout>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline">Delivery Status</CardTitle>
                <CardDescription>Tracking delivery from {delivery.pickup} to {delivery.dropoff}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-64 w-full rounded-md overflow-hidden">
                    <Image src="https://placehold.co/800x400.png" alt="Map view" fill style={{objectFit: 'cover'}} data-ai-hint="map route" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{delivery.pickup}</span>
                    </div>
                    <Separator className="w-1/4" />
                     <div className="flex items-center gap-2 text-sm font-semibold">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        <span>In Transit</span>
                    </div>
                    <Separator className="w-1/4" />
                     <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{delivery.dropoff}</span>
                    </div>
                </div>
            </CardContent>
          </Card>
           <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Courier Details</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                    <AvatarImage src={courier.avatar} alt={courier.name} data-ai-hint="profile person" />
                    <AvatarFallback>{courier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                    <h3 className="font-semibold text-lg">{courier.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>{courier.rating}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span className="font-semibold text-lg">₹{delivery.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                         <span className="text-muted-foreground">Method</span>
                         <div className="flex items-center font-medium">
                            {paymentIcon}
                            <span>{delivery.paymentMethod}</span>
                         </div>
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Verification Code</CardTitle>
              <CardDescription>Share this with the recipient for a secure handoff.</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <div className="flex justify-center">
                  <Image src="https://placehold.co/150x150.png" alt="QR Code" width={150} height={150} className="rounded-md" data-ai-hint="qr code"/>
                </div>
                <p className="text-4xl font-bold tracking-widest text-primary">123456</p>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" /> Share with Recipient
                </Button>
            </CardFooter>
          </Card>
           <Card className="flex flex-col h-[420px]">
            <CardHeader>
              <CardTitle className="font-headline">Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto space-y-4">
              <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={courier.avatar} alt={courier.name} />
                  <AvatarFallback>{courier.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="p-3 rounded-lg bg-muted text-sm max-w-xs">
                  Hey! I'm on my way to the pickup location now.
                </p>
              </div>
              <div className="flex items-end gap-2 justify-end">
                 <p className="p-3 rounded-lg bg-primary text-primary-foreground text-sm max-w-xs">
                  Sounds good, thanks for the update!
                </p>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="Me" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <div className="relative w-full">
                <Textarea placeholder="Type your message..." className="pr-12" />
                <Button size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
