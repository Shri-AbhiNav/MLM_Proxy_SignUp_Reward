import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            NativeStaking Smart Contract Documentation
          </h1>
          <p className="text-muted-foreground">
            Comprehensive guide for the NativeStaking smart contract
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview Section */}
          <section className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-3">📌</span>
              Overview
            </h2>
            <p className="text-muted-foreground mb-4">
              The NativeStaking contract is a staking system with referral rewards and admin controls.
            </p>
            <p className="font-medium mb-2">It allows users to:</p>
            <ul className="space-y-2 mb-4 list-disc pl-5">
              <li>🔗 Register with a referral (sign-up required)</li>
              <li>💎 Stake native tokens (ETH / MATIC)</li>
              <li>🎁 Reward referrers with 10% of the stake</li>
              <li>💰 Withdraw contract funds (admin only)</li>
              <li>📊 Track contract balance and user registration</li>
            </ul>
          </section>

          {/* Key Features */}
          <section className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-3">🔑</span>
              Key Features
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <div>
                  <span className="font-medium">Upgradeable (UUPS pattern)</span> – safe for future upgrades.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <div>
                  <span className="font-medium">Referral Rewards</span> – 10% of new user's stake goes to their referrer.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <div>
                  <span className="font-medium">Secure</span> – protected by ReentrancyGuard.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <div>
                  <span className="font-medium">Admin Controls</span> – contract owner can transfer funds and upgrade logic.
                </div>
              </li>
            </ul>
          </section>

          {/* Core Functions */}
          <section className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-3">🔑</span>
              Core Functions
            </h2>
            
            {/* Function 1 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">1. signUp(address user, address referrer)</span>
              </div>
              <p className="text-muted-foreground mb-3">📥 Registers a new user with an optional referral.</p>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Must send ETH/MATIC with this transaction (msg.value).</li>
                <li>• Referrer must already be registered.</li>
                <li>• 10% of the stake goes to the referrer.</li>
                <li>• Remaining stake is added to the user's balance.</li>
              </ul>
              <div className="bg-black/80 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <p>// Example Call:</p>
                <p>signUp(0xNewUser, 0xReferrer) // with value: 1 MATIC</p>
              </div>
            </div>

            {/* Function 2 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">2. stake(address user)</span>
              </div>
              <p className="text-muted-foreground mb-3">💎 Allows an already registered user to stake more native tokens.</p>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Requires msg.value &gt; 0.</li>
                <li>• Updates the user's stake balance.</li>
              </ul>
              <div className="bg-black/80 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <p>// Example Call:</p>
                <p>stake(0xUser) // with value: 0.5 MATIC</p>
              </div>
            </div>

            {/* Function 3 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">3. transfer(address to, uint256 amount)</span>
              </div>
              <p className="text-muted-foreground mb-3">💸 Admin-only function to transfer funds from the contract to any address.</p>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Only callable by owner.</li>
                <li>• Useful for withdrawals, rewards, or emergency fund movements.</li>
              </ul>
              <div className="bg-black/80 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <p>// Example Call:</p>
                <p>transfer(0xRecipient, 1 ether)</p>
              </div>
            </div>

            {/* Function 4 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">4. balanceOfContract()</span>
              </div>
              <p className="text-muted-foreground mb-3">📊 Returns the total contract balance in ETH/MATIC.</p>
              <div className="bg-black/80 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <p>// Example Call:</p>
                <p>balanceOfContract() → 12.5 ether</p>
              </div>
            </div>

            {/* Function 5 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">5. isUserExists(address user)</span>
              </div>
              <p className="text-muted-foreground mb-3">✅ Checks if a user is already registered.</p>
              <div className="bg-black/80 text-green-400 p-3 rounded-md font-mono text-sm overflow-x-auto">
                <p>// Example Call:</p>
                <p>isUserExists(0xUser) → true/false</p>
              </div>
            </div>

            {/* Function 6 */}
            <div className="mb-8 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-lg font-mono font-bold">6. transferOwnership(address newOwner)</span>
              </div>
              <p className="text-muted-foreground mb-3">👑 Transfers contract ownership to another address.</p>
              <p className="text-sm text-amber-500 mb-3">⚠️ Irreversible – current owner will lose all control.</p>
            </div>
          </section>

          {/* Admin Functions */}
          <section className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-3">⚙️</span>
              Admin-Only Functions
            </h2>
            <div className="space-y-2 font-mono text-sm">
              <p>• transfer(to, amount) → Move contract funds</p>
              <p>• transferOwnership(newOwner) → Assign a new owner</p>
              <p>• _authorizeUpgrade(newImplementation) → Required for UUPS upgrades</p>
            </div>
          </section>

          {/* Workflow */}
          <section className="bg-card p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <span className="bg-primary/10 p-1.5 rounded-full mr-3">📊</span>
              Example Workflow
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Contract Deployment</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Deployed on Polygon Amoy Testnet.</li>
                  <li>• Deployer/owner is registered automatically.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">User Registration</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Call signUp(user, referrer) with stake (e.g., 1 MATIC).</li>
                  <li>• Referrer instantly gets 0.1 MATIC (10%).</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Staking More</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Call stake(user) with additional tokens.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Checking Balance</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Use balanceOfContract() to see total funds locked.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Admin Withdraw</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Owner can transfer funds via transfer(to, amount).</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
