import AdminDashboard from "@/components/dashboard/AdminDashboard";
import Header from "@/components/layout/Header";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboard />
    </div>
  );
};

export default Admin;