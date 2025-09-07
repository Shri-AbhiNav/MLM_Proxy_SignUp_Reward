import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Home, LayoutDashboard, Shield } from "lucide-react";
import { ethers } from "ethers";

const Header = () => {
  const location = useLocation();
  const [account, setAccount] = useState<string | null>(null);

  const isActive = (path: string) => location.pathname === path;

  const connectWallet = async () => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        alert("MetaMask not found. Please install it!");
        return;
      }
      const provider = new ethers.BrowserProvider(ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
        }
      }
    };
    checkConnection();

    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-white font-bold text-sm">
              S
            </div>
            <span className="text-xl font-bold text-foreground">StakeChain</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant={isActive("/") ? "gradient" : "ghost"} size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant={isActive("/dashboard") ? "gradient" : "ghost"} size="sm" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant={isActive("/admin") ? "gradient" : "ghost"} size="sm" className="gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </nav>

          {/* Connect Wallet Button */}
          {account ? (
            <Button variant="hero" className="gap-2">
              <Wallet className="h-4 w-4" />
              {account.slice(0, 6)}...{account.slice(-4)}
            </Button>
          ) : (
            <Button variant="hero" className="gap-2" onClick={connectWallet}>
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
