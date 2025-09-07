import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, DollarSign, CheckCircle, Coins, Users, Percent } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "@/utils/getContract";

const UserDashboard = () => {
  const [signUpData, setSignUpData] = useState({
    referrerAddress: "",
    stakeAmount: ""
  });

  const [stakeAmount, setStakeAmount] = useState("");
  const [checkAddress, setCheckAddress] = useState("");

  const [isUserRegistered, setIsUserRegistered] = useState<boolean | null>(null);
  const [userStakedAmount, setUserStakedAmount] = useState("0");
  const [userReferrer, setUserReferrer] = useState("");
  const [referralRewardPercent, setReferralRewardPercent] = useState("0");

  const handleSignUp = async () => {
    try {
      const contract = await getContract();
      const signer = await (await (new ethers.BrowserProvider((window as any).ethereum))).getSigner();
      const userAddr = await signer.getAddress();

      // Use default address if no referrer is provided
      const referrerAddress = signUpData.referrerAddress.trim() || "0x41093c7900051058Aa473A3DeC5228B81826e6f0";

      const tx = await contract.signUp(
        userAddr,
        referrerAddress,
        { value: ethers.parseEther(signUpData.stakeAmount) }
      );
      await tx.wait();
      alert("✅ Sign Up successful!");
      
      // Reset form
      setSignUpData({
        referrerAddress: "",
        stakeAmount: ""
      });
    } catch (error: any) {
      console.error(error);
      alert(`❌ Sign Up failed! ${error.message || ''}`.trim());
    }
  };

  const handleStake = async () => {
    try {
      const contract = await getContract();
      const signer = await (await (new ethers.BrowserProvider((window as any).ethereum))).getSigner();
      const userAddr = await signer.getAddress();

      const tx = await contract.stake(userAddr, {
        value: ethers.parseEther(stakeAmount)
      });
      await tx.wait();
      alert("✅ Stake successful!");
    } catch (error) {
      console.error(error);
      alert("❌ Stake failed!");
    }
  };

  const handleCheckUser = async () => {
    try {
      const contract = await getContract();
      const exists = await contract.isUserExists(checkAddress);
      setIsUserRegistered(exists);
    } catch (error) {
      console.error(error);
      alert("❌ Error checking user!");
    }
  };

  const handleGetReferrer = async () => {
    try {
      const contract = await getContract();
      const signer = await (await (new ethers.BrowserProvider((window as any).ethereum))).getSigner();
      const userAddr = await signer.getAddress();

      const ref = await contract.referrerOf(userAddr);
      setUserReferrer(ref);
    } catch (error) {
      console.error(error);
      alert("❌ Error fetching referrer!");
    }
  };

  const handleGetRewardRate = async () => {
    try {
      const contract = await getContract();
      const percent = await contract.REFERRAL_REWARD_PERCENT();
      setReferralRewardPercent(percent.toString());
    } catch (error) {
      console.error(error);
      alert("❌ Error fetching reward percent!");
    }
  };

  const handleGetStakeAmount = async () => {
    try {
      const contract = await getContract();
      const signer = await (await (new ethers.BrowserProvider((window as any).ethereum))).getSigner();
      const userAddr = await signer.getAddress();

      const amount = await contract.stakedAmounts(userAddr);
      setUserStakedAmount(ethers.formatEther(amount));
    } catch (error) {
      console.error(error);
      alert("❌ Error fetching staked amount!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          User Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your staking activities and referral network
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              Sign Up
            </CardTitle>
            <CardDescription>
              Register with a referrer's address and stake amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="referrer">Referrer's Address (Optional)</Label>
                <Badge variant="outline" className="text-xs">
                  Default: 0x4109...6f0f
                </Badge>
              </div>
              <Input
                id="referrer"
                placeholder="Leave empty to use default (0x4109...6f0f)"
                value={signUpData.referrerAddress}
                onChange={(e) => setSignUpData({ ...signUpData, referrerAddress: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="stake">Stake Amount (ETH/MATIC)</Label>
              <Input
                id="stake"
                type="number"
                placeholder="0.0"
                value={signUpData.stakeAmount}
                onChange={(e) => setSignUpData({ ...signUpData, stakeAmount: e.target.value })}
              />
            </div>
            <Button className="w-full" variant="gradient" onClick={handleSignUp}>
              Sign Up & Stake
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Stake More
            </CardTitle>
            <CardDescription>
              Add more funds to your existing stake
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="additional-stake">Additional Stake Amount</Label>
              <Input
                id="additional-stake"
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </div>
            <Button className="w-full" variant="gradient" onClick={handleStake}>
              Stake More
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Check User Registration
            </CardTitle>
            <CardDescription>
              Verify if a wallet address is registered
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="check-address">Wallet Address</Label>
              <Input
                id="check-address"
                placeholder="0x..."
                value={checkAddress}
                onChange={(e) => setCheckAddress(e.target.value)}
              />
            </div>
            <Button className="w-full" variant="outline-gradient" onClick={handleCheckUser}>
              Check Registration Status
            </Button>
            {isUserRegistered !== null && (
              <div className="flex items-center gap-2 mt-4">
                <Badge variant={isUserRegistered ? "default" : "destructive"}>
                  {isUserRegistered ? "Registered" : "Not Registered"}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Your Staked Amount
            </CardTitle>
            <CardDescription>
              Total amount you have staked in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">
              {userStakedAmount} ETH
            </div>
            <Button variant="outline-gradient" onClick={handleGetStakeAmount}>
              Refresh Stake
            </Button>
          </CardContent>
        </Card>
 
        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Your Referrer
            </CardTitle>
            <CardDescription>
              Address of the person who referred you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm bg-secondary p-3 rounded-lg break-all">
              {userReferrer || "N/A"}
            </div>
            <Button variant="outline-gradient" onClick={handleGetReferrer}>
              Get Referrer
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Referral Reward Rate
            </CardTitle>
            <CardDescription>
              Percentage you earn on successful referrals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success mb-2">
              {referralRewardPercent}%
            </div>
            <Button variant="outline-gradient" onClick={handleGetRewardRate}>
              Get Reward Rate
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
