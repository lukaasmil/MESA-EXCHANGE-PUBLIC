import { PriceCard } from "@/components/PriceCard";
import { PriceChart } from "@/components/PriceChart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Download, TrendingDown, Bitcoin, ArrowUpRight } from "lucide-react";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { UserMenu } from "@/components/UserMenu";

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: 42000, change: 2.5 },
  { symbol: "ETH", name: "Ethereum", price: 2200, change: -1.2 },
  { symbol: "BNB", name: "Binance Coin", price: 305, change: 0.8 },
  { symbol: "SOL", name: "Solana", price: 98, change: 5.3 },
];

const Index = () => {
  const [showDepositMenu, setShowDepositMenu] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-gradient-to-br from-background to-background/50">
          <div className="flex justify-end items-center gap-4 p-6 border-b border-border/40">
            <div className="flex items-center gap-2 mr-auto">
              <div className="relative">
                <img 
                  src="/lovable-uploads/f7bd7d02-991a-499d-b2c5-327c894e371b.png" 
                  alt="Logo" 
                  className="h-10 w-10 rounded-xl"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00E396] rounded-full border-2 border-background animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Welcome back</span>
                <span className="font-semibold">Mesa Exchange</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <UserMenu />

              <Button variant="outline" className="gap-2 rounded-xl h-11">
                <Wallet className="h-4 w-4" />
                <span className="text-foreground font-medium">$0.00</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2 deposit-button rounded-xl h-11 bg-[#00E396]/10 border-[#00E396]/30 text-[#00E396] hover:bg-[#00E396]/20 shadow-[0_0_15px_rgba(0,227,150,0.2)]"
                onClick={() => setShowDepositMenu(true)}
              >
                <Download className="h-4 w-4" />
                <span>Deposit</span>
              </Button>
            </div>
          </div>
          
          <div className="p-8">
            {showDepositMenu && <DepositMenu onClose={() => setShowDepositMenu(false)} />}
            
            {/* Main Balance Card */}
            <Card className="p-8 rounded-2xl mb-8 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#00E396]/20 hover:border-[#00E396]/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-muted-foreground mb-2">Total Balance</h2>
                  <p className="text-6xl font-black tracking-tight mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">$0.00</p>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 w-fit">
                    <TrendingDown className="h-5 w-5 text-red-400" />
                    <p className="text-red-400 text-xl font-bold">$0.00 (0%)</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button size="lg" className="h-14 px-8 bg-[#00E396] hover:bg-[#00E396]/80 text-black text-lg font-bold rounded-xl">
                    Buy
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 border-[#00E396] text-[#00E396] text-lg font-bold hover:bg-[#00E396]/10 rounded-xl">
                    Sell
                  </Button>
                </div>
              </div>
            </Card>

            {/* Portfolio Section */}
            <Card className="p-8 rounded-2xl mb-8 bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-[#00E396]/20 hover:border-[#00E396]/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Bitcoin className="h-7 w-7 text-[#00E396]" />
                <h2 className="text-3xl font-bold text-white">Portfolio</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {cryptoData.map((crypto) => (
                  <PriceCard key={crypto.symbol} {...crypto} />
                ))}
              </div>
              
              <PriceChart />
            </Card>
          </div>
        </main>
        <Chat />
      </div>
    </SidebarProvider>
  );
};

export default Index;