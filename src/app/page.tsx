
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { ArrowRight, Users, ShoppingBag, MapPin, DollarSign, Rocket } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center">
            <Logo />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <Button asChild>
                <Link href="/role-selection">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-full w-full"
          >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.1),transparent_20%)]"></div>
            <div className="absolute bottom-0 right-0 top-0 bg-[linear-gradient(to_left,hsl(var(--primary)/0.1),transparent_20%)]"></div>
          </div>
          <div className="container text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl">
                Campus Delivery, <span className="text-primary">Simplified</span>.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                UniDrop is the fastest, easiest way to send and receive packages, order from campus vendors, and earn on your own schedule. All within your campus.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/role-selection">
                    Get Started Now
                    <Rocket className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-muted/20 p-2 ring-1 ring-inset ring-primary/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="https://placehold.co/1200x600.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  data-ai-hint="app dashboard"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Why You'll Love UniDrop</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need for seamless campus logistics, all in one app.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Peer-to-Peer Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Need to send something across campus? Get it delivered quickly and affordably by a fellow student.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <CardTitle>Vendor Ordering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Craving snacks from the campus store or lunch from the food court? Order directly and have it delivered.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <CardTitle>Live Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Watch your delivery progress in real-time on the map. No more guessing when your package will arrive.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <CardTitle>Flexible Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Have some free time between classes? Sign up as a courier and earn money by making deliveries.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 sm:py-32 bg-muted/20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get started in just three simple steps.
              </p>
            </div>
            <div className="relative mt-16">
              <div className="absolute left-1/2 top-4 hidden h-full w-px bg-border md:block"></div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-primary text-primary font-bold text-2xl mb-4">1</div>
                  <h3 className="text-xl font-semibold font-headline">Choose Your Role</h3>
                  <p className="mt-2 text-muted-foreground">Are you a customer, courier, or vendor? Select your role to get a tailored experience.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-primary text-primary font-bold text-2xl mb-4">2</div>
                  <h3 className="text-xl font-semibold font-headline">Create or Accept a Job</h3>
                  <p className="mt-2 text-muted-foreground">Customers can request deliveries, while couriers can browse and accept available jobs.</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-card border-2 border-primary text-primary font-bold text-2xl mb-4">3</div>
                  <h3 className="text-xl font-semibold font-headline">Track and Complete</h3>
                  <p className="mt-2 text-muted-foreground">Track your delivery in real-time and use secure verification codes to complete the process.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Final CTA */}
        <section className="py-24 sm:py-32">
          <div className="container text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Ready to Join the Campus Network?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sign up today and make your campus life easier.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/role-selection">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UniDrop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
