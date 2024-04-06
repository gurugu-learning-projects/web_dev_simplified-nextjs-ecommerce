import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

function getSalesData() {
  return [];
}

export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Sales" subtitle="desc" body="Text" />
      <DashboardCard title="Products" subtitle="desc" body="Text" />
      <DashboardCard title="Customers" subtitle="desc" body="Text" />
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
