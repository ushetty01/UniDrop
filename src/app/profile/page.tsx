import AppLayout from "@/components/app-layout";
import { userProfile } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Package, Edit, User as UserIcon, Award, Trophy, Gem } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const totalTransactions = userProfile.deliveriesMade + userProfile.deliveriesReceived;
  const rating = userProfile.rating;

  let badge = { 
    name: "Newcomer", 
    icon: <Package className="w-4 h-4" />, 
    color: "text-muted-foreground" 
  };

  if (totalTransactions >= 50 && rating >= 4.8) {
      badge = { name: "Elite", icon: <Gem className="w-4 h-4" />, color: "text-violet-400" };
  } else if (totalTransactions >= 30 && rating >= 4.7) {
      badge = { name: "Pro", icon: <Trophy className="w-4 h-4" />, color: "text-amber-400" };
  } else if (totalTransactions >= 10 && rating >= 4.5) {
      badge = { name: "Reliable", icon: <Award className="w-4 h-4" />, color: "text-sky-400" };
  } else if (totalTransactions > 0) {
      badge = { name: "Rising Star", icon: <Star className="w-4 h-4" />, color: "text-yellow-400" };
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">My Profile</h1>
          <p className="text-muted-foreground">
            View and manage your account details.
          </p>
        </div>

        <Card>
            <CardHeader className="flex-row gap-4 items-center">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="profile person" />
                    <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="font-headline text-2xl">{userProfile.name}</CardTitle>
                    <CardDescription>{userProfile.email}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span>{userProfile.rating} avg. rating</span>
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <div className={`flex items-center gap-1.5 font-medium ${badge.color}`}>
                            {badge.icon}
                            <span>{badge.name}</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{userProfile.deliveriesMade}</p>
                        <p className="text-sm text-muted-foreground">Deliveries Made</p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{userProfile.deliveriesReceived}</p>
                        <p className="text-sm text-muted-foreground">Deliveries Received</p>
                    </div>
                     <div className="p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{totalTransactions}</p>
                        <p className="text-sm text-muted-foreground">Total Transactions</p>
                    </div>
                </div>
                <Separator className="my-6" />
                <div>
                    <h3 className="font-headline text-lg mb-4">Account Information</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Full Name</span>
                            <span>{userProfile.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span>{userProfile.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Campus ID</span>
                            <span>{userProfile.campusId}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2"/>
                    Edit Profile
                </Button>
            </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
