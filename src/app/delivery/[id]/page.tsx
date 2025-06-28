
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { userProfile } from "@/lib/data";
import { useDeliveries } from "@/context/delivery-context";
import AppLayout from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Star, MapPin, Share2, Send, Wallet, CreditCard, Landmark, User, CheckCircle, Camera, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const paymentIcons: Record<string, React.ReactNode> = {
    "Cash": <Wallet className="w-4 h-4 mr-2" />,
    "UPI": <Landmark className="w-4 h-4 mr-2" />,
    "Card": <CreditCard className="w-4 h-4 mr-2" />,
}

export default function DeliveryStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const { id } = params as { id: string };
  const { toast } = useToast();
  const { deliveries, completeDelivery } = useDeliveries();
  
  const role = searchParams.get('role') || 'customer';
  const isCourier = role === 'courier';

  const [verificationCode, setVerificationCode] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [courierPosition, setCourierPosition] = useState({ top: '15%', left: '10%' });
  
  const delivery = deliveries.find(d => d.id === id);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I'm on my way to the pickup location now.", sender: 'courier' },
    { id: 2, text: "Sounds good, thanks for the update!", sender: 'customer' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const getCameraPermission = async () => {
      if (isCourier && typeof navigator !== 'undefined' && navigator.mediaDevices) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
        }
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isCourier]);

  useEffect(() => {
    if (delivery?.status === 'In Transit' && !isCourier) {
        const path = [
            { top: '15%', left: '10%' },
            { top: '25%', left: '30%' },
            { top: '40%', left: '50%' },
            { top: '55%', left: '70%' },
            { top: '70%', left: '85%' },
        ];
        let step = 0;

        const interval = setInterval(() => {
            step++;
            if (step < path.length) {
                setCourierPosition(path[step]);
            } else {
                clearInterval(interval);
            }
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }
  }, [delivery, isCourier]);
  

  if (!delivery) {
    return (
      <AppLayout>
        <p>Delivery not found.</p>
      </AppLayout>
    );
  }
  
  const { courier } = delivery;

  if (!courier && role !== 'customer') {
      return (
      <AppLayout>
        <p>Delivery not found or no courier assigned.</p>
      </AppLayout>
    );
  }

  const paymentIcon = delivery.paymentMethod ? paymentIcons[delivery.paymentMethod] : null;

  const handleVerificationSubmit = () => {
    if (verificationCode === '123456') { // Mock verification code check
      completeDelivery(delivery.id);
      toast({
        title: "Delivery Completed!",
        description: "The verification code is correct.",
      });
      router.push(`/dashboard?role=courier`);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "The verification code is incorrect. Please try again.",
      });
    }
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const currentUserRole = isCourier ? 'courier' : 'customer';
    
    setMessages(prevMessages => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage, sender: currentUserRole },
    ]);
    setNewMessage('');

    // Simulate a reply after a delay
    setTimeout(() => {
        const otherUserRole = isCourier ? 'customer' : 'courier';
        setMessages(prevMessages => [
            ...prevMessages,
            { id: prevMessages.length + 1, text: "Okay, thanks!", sender: otherUserRole }
        ]);
    }, 1200);
  };

  const detailsPerson = isCourier ? userProfile : courier;
  const currentUser = isCourier ? courier : userProfile;

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
                <div className="relative h-64 w-full rounded-md overflow-hidden bg-muted">
                    <Image 
                      src={delivery.mapImageUrl || "https://placehold.co/800x400.png"} 
                      alt="Map view" 
                      fill 
                      style={{objectFit: 'cover'}} 
                      data-ai-hint="map route"
                      unoptimized
                    />
                    {delivery.status === 'In Transit' && !isCourier && (
                        <div
                            className="absolute transition-all duration-1000 ease-linear"
                            style={{ 
                                top: courierPosition.top, 
                                left: courierPosition.left,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="relative">
                                <Truck className="w-8 h-8 text-primary-foreground bg-primary p-1 rounded-full shadow-lg" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-primary animate-ping"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-primary"></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{delivery.pickup}</span>
                    </div>
                    <Separator className="w-1/4" />
                     <div className="flex items-center gap-2 text-sm font-semibold">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                        <span>{delivery.status}</span>
                    </div>
                    <Separator className="w-1/4" />
                     <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{delivery.dropoff}</span>
                    </div>
                </div>
            </CardContent>
          </Card>
           {detailsPerson && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                  <CardHeader>
                  <CardTitle className="font-headline">{isCourier ? 'Customer Details' : 'Courier Details'}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={detailsPerson.avatar} alt={detailsPerson.name} data-ai-hint="profile person" />
                        <AvatarFallback>{detailsPerson.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{detailsPerson.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {isCourier ? (
                                  <>
                                      <User className="w-4 h-4" />
                                      <span>Customer</span>
                                  </>
                              ) : (
                                  <>
                                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                      <span>{detailsPerson.rating}</span>
                                  </>
                              )}
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
           )}
        </div>
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Verification</CardTitle>
              <CardDescription>{isCourier ? 'Complete the delivery using one of the methods below.' : 'Share the code or QR with the courier for verification.'}</CardDescription>
            </CardHeader>
             <CardContent>
                <Tabs defaultValue="code" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="qr">Scan QR</TabsTrigger>
                </TabsList>
                <TabsContent value="code" className="mt-4">
                  {isCourier ? (
                    <Input 
                      type="text" 
                      placeholder="123456" 
                      maxLength={6}
                      className="text-4xl font-bold tracking-widest text-center h-auto py-2"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                    />
                  ) : (
                    <div className="text-center pt-4">
                      <p className="text-4xl font-bold tracking-widest text-primary">123456</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="qr" className="mt-4">
                  {isCourier ? (
                    <div className="space-y-2">
                        <video ref={videoRef} className="w-full aspect-square rounded-md bg-muted object-cover" autoPlay muted playsInline />
                        {hasCameraPermission === false && (
                            <Alert variant="destructive">
                                <Camera className="h-4 w-4" />
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to use this feature.
                                </AlertDescription>
                            </Alert>
                        )}
                         <p className="text-xs text-muted-foreground text-center">Note: QR scanning requires camera access.</p>
                    </div>
                  ) : (
                    <div className="flex justify-center pt-4">
                      <Image src="https://placehold.co/150x150.png" alt="QR Code" width={150} height={150} className="rounded-md" data-ai-hint="qr code"/>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
                {isCourier ? (
                  <Button className="w-full" onClick={handleVerificationSubmit}>
                      <CheckCircle className="w-4 h-4 mr-2" /> Complete Delivery
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" /> Share with Recipient
                  </Button>
                )}
            </CardFooter>
          </Card>
           {detailsPerson && (
            <Card className="flex flex-col h-[420px]">
              <CardHeader>
                <CardTitle className="font-headline">Chat</CardTitle>
              </CardHeader>
              <CardContent ref={chatContainerRef} className="flex-grow overflow-y-auto space-y-4">
                {messages.map((message) => {
                  const isMyMessage = (isCourier && message.sender === 'courier') || (!isCourier && message.sender === 'customer');
                  
                  return (
                    <div key={message.id} className={`flex items-end gap-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                      {!isMyMessage && detailsPerson && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={detailsPerson.avatar} alt={detailsPerson.name} />
                          <AvatarFallback>{detailsPerson.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <p className={`p-3 rounded-lg text-sm max-w-xs ${isMyMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        {message.text}
                      </p>
                      {isMyMessage && currentUser && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter className="pt-4 border-t">
                <div className="relative w-full">
                  <Textarea 
                    placeholder="Type your message..." 
                    className="pr-12"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
           )}
        </div>
      </div>
    </AppLayout>
  );
}
