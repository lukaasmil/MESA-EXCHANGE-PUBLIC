import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Shield, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";

const myCoinsData = [
  { name: "Bitcoin", symbol: "BTC", amount: "0.025", value: 1050.25, change: 2.5 },
  { name: "Ethereum", symbol: "ETH", amount: "0.5", value: 1100.00, change: -1.8 },
  { name: "Solana", symbol: "SOL", amount: "10.0", value: 980.00, change: 5.2 },
];

const MyCoins = () => {
  const [showDepositMenu, setShowDepositMenu] = useState(false);

  const handleCloseDeposit = () => {
    setShowDepositMenu(false);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex justify-end items-center gap-4 p-4 border-b border-border/40">
            <div className="flex items-center gap-2 mr-auto">
              <Shield className="h-5 w-5 text-[#00E396]" />
              <span className="text-sm text-muted-foreground">Secure Trading Platform</span>
            </div>
            
            <div className="flex items-center gap-3 mr-4">
              <div className="w-8 h-8 rounded-full border border-[#00E396]/30 bg-card/50"></div>
              <span className="text-sm font-medium">Username123</span>
            </div>

            <Button variant="outline" className="gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-[#00E396] font-bold">$0.00</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="gap-2 deposit-button"
              onClick={() => setShowDepositMenu(true)}
            >
              <Download className="h-4 w-4" />
              <span>Deposit</span>
            </Button>
          </div>
          
          <div className="p-8 relative">
            {showDepositMenu && <DepositMenu onClose={handleCloseDeposit} />}
            
            <div className="glass-card p-8 rounded-lg mb-8">
              <h1 className="text-3xl font-bold mb-6">My Coins</h1>
              <div className="grid grid-cols-1 gap-4">
                {myCoinsData.map((coin) => (
                  <div key={coin.symbol} className="glass-card p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{coin.name}</h3>
                        <p className="text-muted-foreground">{coin.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">${coin.value.toLocaleString()}</p>
                        <div className={`flex items-center gap-1 ${coin.change >= 0 ? 'text-[#00E396]' : 'text-red-500'}`}>
                          {coin.change >= 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{Math.abs(coin.change)}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/40">
                      <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-bold">{coin.amount} {coin.symbol}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Chat />
      </div>
    </SidebarProvider>
  );
};

export default MyCoins;