import db from "@/db/db";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUsersData() {
  const userCountPromise = db.user.count();
  const orderDataPromise = db.order.aggregate({
    _sum: { pricePaidInCents: true },
  });

  const [userCount, orderData] = await Promise.all([
    userCountPromise,
    orderDataPromise,
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

export default async function AdminDashboard() {
  const [salesData, usersData] = await Promise.all([
    getSalesData(),
    getUsersData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard title="Products" subtitle="desc" body="Text" />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          usersData.averageValuePerUser
        )} Average Value`}
        body={`${formatNumber(usersData.userCount)} Users`}
      />
      <DashboardCard title="Sales" subtitle="desc" body="Text" />
    </div>
  );
}

function DashboardCard({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{body}</p>
        </CardContent>
      </Card>
    </div>
  );
}
