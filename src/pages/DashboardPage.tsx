
import MainLayout from "@/layouts/MainLayout";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

export default function DashboardPage() {
  return (
    <MainLayout userRole="admin">
      <AdminDashboard />
    </MainLayout>
  );
}
