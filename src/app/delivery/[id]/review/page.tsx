"use client"

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/app-layout";
import { StarRating } from "@/components/delivery/star-rating";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
    const [rating, setRating] = useState(0);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = () => {
        toast({
            title: "Review Submitted",
            description: "Thank you for your feedback!",
        });
        router.push("/dashboard");
    }

  return (
    <AppLayout>
        <div className="flex justify-center items-center h-full">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Rate Your Delivery</CardTitle>
                    <CardDescription>Your feedback helps us improve the service for everyone.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Your Rating</Label>
                        <div className="flex">
                            <StarRating rating={rating} onRatingChange={setRating} size={32} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="review">Comments (Optional)</Label>
                        <Textarea id="review" placeholder="Tell us more about your experience..." />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} className="w-full">
                        Submit Review
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </AppLayout>
  );
}
