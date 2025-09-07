import UserDashboard from "@/components/dashboard/UserDashboard";
import Header from "@/components/layout/Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <UserDashboard />
    </div>
  );
};

export default Dashboard;