import AppLayout from "@/components/app-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deliveries } from "@/lib/data";
import { DollarSign, Package } from "lucide-react";
import { format } from "date-fns";

export default function EarningsPage() {
  const completedDeliveries = deliveries.filter(
    (d) => d.status === "Delivered" && d.courier
  );
  const totalEarnings = completedDeliveries.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-headline text-3xl font-semibold">My Earnings</h1>
          <p className="text-muted-foreground">
            An overview of your completed jobs and total earnings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalEarnings}</div>
              <p className="text-xs text-muted-foreground">
                Total earnings from all completed jobs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedDeliveries.length}</div>
              <p className="text-xs text-muted-foreground">
                Total number of deliveries successfully completed.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Completed Jobs History</CardTitle>
            <CardDescription>
              A detailed list of all the deliveries you've successfully
              completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Item Description</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-right">Earning</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedDeliveries.length > 0 ? (
                  completedDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>
                        {format(new Date(delivery.date), "dd MMM, yyyy")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {delivery.item}
                      </TableCell>
                      <TableCell>{delivery.pickup}</TableCell>
                      <TableCell>{delivery.dropoff}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{delivery.price}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      You haven't completed any jobs yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
