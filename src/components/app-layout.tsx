
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BriefcaseBusiness,
  History,
  LayoutDashboard,
  LogOut,
  Package,
  PackagePlus,
  PanelLeft,
  Share2,
  User,
  Building,
  DollarSign,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./logo";
import { vendors } from "@/lib/data";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const isCourier = role === 'courier';
  const isVendor = role === 'vendor';
  const roleQuery = role ? `?role=${role}` : '';


  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.origin)
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "A shareable link has been copied to your clipboard.",
        });
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem copying the link.",
        });
      });
  };

  const navLinks = (
    <>
      {isCourier ? (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href={`/dashboard${roleQuery}`}><LayoutDashboard />Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Jobs">
              <Link href={`/my-jobs${roleQuery}`}><BriefcaseBusiness />My Jobs</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Job History">
              <Link href={`/earnings${roleQuery}`}><History />Job History</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      ) : isVendor ? (
        <>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href={`/dashboard${roleQuery}`}><LayoutDashboard />Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Order History">
              <Link href={`/order-history${roleQuery}`}><History />Order History</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Earnings">
              <Link href={`/earnings${roleQuery}`}><DollarSign />Earnings</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      ) : (
        <>
           <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href={`/dashboard${roleQuery}`}><LayoutDashboard />Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Orders">
              <Link href={`/my-orders${roleQuery}`}><Package />My Orders</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="New Delivery">
              <Link href={`/delivery/new${roleQuery}`}><PackagePlus />New Delivery</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </>
      )}
    </>
  );

  const userInfo = isCourier 
    ? { name: 'Courier Name', email: 'courier@manipal.edu', avatarFallback: 'C' } 
    : isVendor 
    ? { name: vendors[0].name, email: 'vendor@manipal.edu', avatarFallback: 'V' }
    : { name: 'Student Name', email: 'student@manipal.edu', avatarFallback: 'S' };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo className="text-lg font-semibold text-sidebar-foreground" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-3 p-3">
             <Avatar>
              <AvatarImage src="https://placehold.co/40x40.png" alt={userInfo.name} />
              <AvatarFallback>{userInfo.avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userInfo.name}</span>
              <span className="text-xs text-muted-foreground">{userInfo.email}</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <SidebarHeader>
                 <div className="flex items-center gap-2 p-4">
                    <Logo className="text-lg font-semibold text-sidebar-foreground" />
                </div>
              </SidebarHeader>
              <SidebarContent className="p-2">
                <SidebarMenu>
                    {navLinks}
                </SidebarMenu>
              </SidebarContent>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
            {/* Can add a search bar here if needed */}
          </div>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share App
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40.png" alt={userInfo.name} data-ai-hint="profile avatar" />
                  <AvatarFallback>{userInfo.avatarFallback}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/profile${roleQuery}`}><User className="mr-2 h-4 w-4" />Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/"><LogOut className="mr-2 h-4 w-4" />Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
