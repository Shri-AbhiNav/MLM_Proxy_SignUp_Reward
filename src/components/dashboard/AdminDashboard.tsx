import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Crown, Wallet, Send, ArrowRightLeft } from "lucide-react";
import { ethers } from "ethers";
import { getContract } from "@/utils/getContract";

const AdminDashboard = () => {
  const [transferData, setTransferData] = useState({ recipient: "", amount: "" });
  const [newOwner, setNewOwner] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [contractBalance, setContractBalance] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        const contract = await getContract();

        const owner = await contract.owner();
        setCurrentOwner(owner);

        // Get contract balance
        // const balance = await contract.provider.getBalance(contract.target);
        // setContractBalance(ethers.formatEther(balance));
        const balance = await contract.balanceOfContract();
        setContractBalance(ethers.formatEther(balance));
      } catch (err) {
        console.error("Error loading contract data:", err);
      }
    })();
  }, []);

  const handleTransferFunds = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.transfer(
        transferData.recipient,
        ethers.parseEther(transferData.amount)
      );
      await tx.wait();
      alert("Funds transferred successfully!");

      // Refresh balance
      // const balance = await contract.provider.getBalance(contract.target);
      // setContractBalance(ethers.formatEther(balance));
      const balance = await contract.balanceOfContract();
      setContractBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
      alert("Error transferring funds");
    }
  };

  const handleTransferOwnership = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.transferOwnership(newOwner);
      await tx.wait();
      alert("Ownership transferred!");

      const owner = await contract.owner();
      setCurrentOwner(owner);
    } catch (err) {
      console.error(err);
      alert("Error transferring ownership");
    }
  };

  const handleRefreshBalance = async () => {
    try {
      const contract = await getContract();
      // const balance = await contract.provider.getBalance(contract.target);
      // setContractBalance(ethers.formatEther(balance));
      const balance = await contract.balanceOfContract();
      setContractBalance(ethers.formatEther(balance));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRefreshOwner = async () => {
    try {
      const contract = await getContract();
      const owner = await contract.owner();
      setCurrentOwner(owner);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage contract funds and ownership settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Transfer Funds
            </CardTitle>
            <CardDescription>Withdraw funds from the contract</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>Recipient Address</Label>
            <Input
              value={transferData.recipient}
              onChange={(e) => setTransferData({ ...transferData, recipient: e.target.value })}
              placeholder="0x..."
            />

            <Label>Amount (ETH/MATIC)</Label>
            <Input
              type="number"
              value={transferData.amount}
              onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
              placeholder="0.0"
            />

            <Button className="w-full" variant="gradient" onClick={handleTransferFunds}>
              Transfer Funds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              Transfer Ownership
            </CardTitle>
            <CardDescription>Give admin rights to another address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label>New Owner Address</Label>
            <Input
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              placeholder="0x..."
            />
            <Button className="w-full" variant="destructive" onClick={handleTransferOwnership}>
              Transfer Ownership
            </Button>
            <p className="text-xs text-muted-foreground">
              ⚠️ This action is irreversible. You will lose admin access.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Current Owner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-secondary p-3 rounded-lg break-all mb-4">
              {currentOwner || "Loading..."}
            </div>
            <Button variant="outline-gradient" size="sm" onClick={handleRefreshOwner}>
              Refresh Owner
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              Contract Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{contractBalance} ETH</div>
            <Button variant="outline-gradient" size="sm" onClick={handleRefreshBalance}>
              Refresh Balance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
