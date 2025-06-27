import Link from "next/link";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch } from "lucide-react";

export default function SelectCourierPage() {
  return (
    <AppLayout>
      <div className="flex justify-center items-center h-full">
            <Card className="w-full max-w-lg text-center">
                <CardHeader className="items-center">
                    <PackageSearch className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="font-headline text-2xl">Finding a Courier</CardTitle>
                    <CardDescription>This page is no longer in use. Your delivery request is now sent to all available couriers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">The first courier to accept your request will be assigned.</p>
                    <Button asChild>
                        <Link href="/dashboard">Back to Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
