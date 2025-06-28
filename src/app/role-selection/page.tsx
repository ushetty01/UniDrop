
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Truck, Building } from 'lucide-react';
import { Logo } from '@/components/logo';

export default function RoleSelectionPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex justify-center">
         <Logo />
      </div>
      <div className="w-full max-w-6xl text-center">
        <h1 className="text-3xl font-headline font-semibold mb-2">Choose Your Role</h1>
        <p className="text-muted-foreground mb-8">How will you be using UniDrop today?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/dashboard?role=customer">
            <Card className="p-8 hover:bg-card/80 hover:border-primary transition-all duration-200 h-full flex flex-col justify-center items-center">
                <User className="w-16 h-16 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">I'm a Customer</CardTitle>
                <CardDescription className="mt-2">I want to request a delivery.</CardDescription>
            </Card>
          </Link>
          <Link href="/dashboard?role=courier">
             <Card className="p-8 hover:bg-card/80 hover:border-primary transition-all duration-200 h-full flex flex-col justify-center items-center">
                <Truck className="w-16 h-16 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">I'm a Courier</CardTitle>
                <CardDescription className="mt-2">I want to make a delivery.</CardDescription>
            </Card>
          </Link>
          <Link href="/dashboard?role=vendor">
             <Card className="p-8 hover:bg-card/80 hover:border-primary transition-all duration-200 h-full flex flex-col justify-center items-center">
                <Building className="w-16 h-16 text-primary mb-4" />
                <CardTitle className="font-headline text-2xl">I'm a Vendor</CardTitle>
                <CardDescription className="mt-2">I want to manage my orders.</CardDescription>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
