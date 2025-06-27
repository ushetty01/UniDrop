import Link from "next/link";
import AppLayout from "@/components/app-layout";
import { couriers } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Clock } from "lucide-react";

export default function SelectCourierPage({ params }: { params: { id: string } }) {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">Choose a Courier</h1>
          <p className="text-muted-foreground">
            Select a student to handle your delivery request.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {couriers.map((courier) => (
            <Card key={courier.id} className="flex flex-col">
              <CardContent className="pt-6 text-center flex flex-col items-center flex-grow">
                 <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={courier.avatar} alt={courier.name} data-ai-hint="profile person" />
                  <AvatarFallback>{courier.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-lg font-semibold">{courier.name}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{courier.rating}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{courier.estTime}</span>
                    </div>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <Button asChild className="w-full">
                    <Link href={`/delivery/${params.id}`}>Select</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
