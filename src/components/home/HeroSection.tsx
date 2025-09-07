import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Users, Layers, Repeat } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      
      <div className="container relative mx-auto px-4 text-center">
        <Badge className="mb-6 bg-gradient-primary text-white px-4 py-1">
          ⚡ Next-Gen MLM + DeFi Platform
        </Badge>

        <Badge className="mb-6 bg-gradient-secondary text-white px-4 py-1 flex items-center justify-center gap-1 mx-auto">
          <Repeat className="w-4 h-4" /> Upgradable Smart Contracts for Future Benefits
        </Badge>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Stake, Earn & Multiply
          </span>
          <br />
          <span className="text-foreground">with Blockchain MLM Staking</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Experience the power of <strong>Decentralized Staking + MLM Rewards</strong>.  
          Build your network, earn referral bonuses, and grow your wealth with the most innovative 
          blockchain-based <strong>multi-level income system</strong>.  
          <br />
          Stake tokens, invite friends, and enjoy <strong>passive income + network-driven rewards</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            variant="hero" 
            className="gap-2"
            onClick={() => navigate('/dashboard')}
          >
            Start Staking Now
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline-gradient" 
            className="gap-2"
            onClick={() => navigate('/documentation')}
          >
            <Play className="h-4 w-4" />
            View Documentation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
          <div className="p-6 rounded-2xl bg-card shadow-md">
            <Users className="w-10 h-10 mx-auto text-primary mb-3" />
            <h3 className="text-xl font-semibold">Referral Rewards</h3>
            <p className="text-muted-foreground text-sm">
              Earn <strong>10% commission</strong> instantly when your referrals stake. 
              Build your team and maximize your returns.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card shadow-md">
            <Layers className="w-10 h-10 mx-auto text-accent mb-3" />
            <h3 className="text-xl font-semibold">Multi-Level Network</h3>
            <p className="text-muted-foreground text-sm">
              Grow a <strong>layered income stream</strong> through blockchain-based MLM. 
              Transparent, fair, and unstoppable.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-card shadow-md">
            <ArrowRight className="w-10 h-10 mx-auto text-foreground mb-3" />
            <h3 className="text-xl font-semibold">Passive Staking Income</h3>
            <p className="text-muted-foreground text-sm">
              Stake your crypto and let your funds work for you while enjoying referral bonuses.
            </p>
          </div>
        </div>

        <p className="mt-16 text-muted-foreground text-sm">
          🚀 Developed by :- <span className="font-semibold text-primary">Shri Abhinav</span>
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
