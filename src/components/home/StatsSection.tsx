import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatsSection = () => {
  const stats = [
    {
      value: "$12.5M",
      label: "Total Value Locked",
      growth: "+23.5%",
      positive: true,
    },
    {
      value: "15,247",
      label: "Active Stakers",
      growth: "+8.2%",
      positive: true,
    },
    {
      value: "$2.1M",
      label: "Rewards Distributed",
      growth: "+45.1%",
      positive: true,
    },
    {
      value: "234%",
      label: "Network Growth",
      growth: "+12.3%",
      positive: true,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow-primary/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mb-3">
                  {stat.label}
                </div>
                <Badge 
                  variant="default" 
                  className="bg-success/10 text-success border-success/20 hover:bg-success/20"
                >
                  {stat.growth}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;