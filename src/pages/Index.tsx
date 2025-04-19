import Dashboard from "@/components/Dashboard";
import ApiInfo from "@/components/ApiInfo";
import DatabaseInfo from "@/components/DatabaseInfo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container py-8 flex-1">
        <Header />
        <Dashboard />
        <ApiInfo />
        <DatabaseInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
