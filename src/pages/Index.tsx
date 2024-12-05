import { PriceCard } from "@/components/PriceCard";
import { PriceChart } from "@/components/PriceChart";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Shield, TrendingUp, TrendingDown, Bitcoin } from "lucide-react";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";

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
        <main className="flex-1">
          <div className="flex justify-end items-center gap-4 p-4 border-b border-border/40">
            <div className="flex items-center gap-2 mr-auto">
              <img 
                src="/lovable-uploads/f3ba03a4-af84-415d-af6d-715cb2180e61.png" 
                alt="Logo" 
                className="h-6 w-6 filter brightness-200"
              />
              <span className="text-sm text-muted-foreground font-medium">Mesa Exchange</span>
            </div>
            
            <div className="flex items-center gap-3 mr-4">
              <div className="w-8 h-8 rounded-full bg-[#00E396]/10 border border-[#00E396]/20 flex items-center justify-center">
                <span className="text-sm font-medium text-[#00E396]">U</span>
              </div>
              <span className="text-sm font-medium">Username123</span>
            </div>

            <Button variant="outline" className="gap-2">
              <Wallet className="h-4 w-4" />
              <span className="text-foreground">$0.00</span>
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
          
          <div className="p-8">
            {showDepositMenu && <DepositMenu onClose={() => setShowDepositMenu(false)} />}
            
            <div className="glass-card p-8 rounded-lg mb-8 bg-gradient-to-br from-[#00E396]/5 to-transparent border border-[#00E396]/20">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/lovable-uploads/f3ba03a4-af84-415d-af6d-715cb2180e61.png" 
                  alt="Logo" 
                  className="h-12 w-12 filter brightness-200"
                />
                <div>
                  <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00E396] to-white">
                    My Balance
                  </h1>
                  <p className="text-7xl font-black tracking-tight mb-2 text-white">
                    $1,234.56
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                  <TrendingDown className="h-5 w-5 text-red-400" />
                  <p className="text-red-400 text-xl font-bold">-$123.45 (10%)</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                10% Less than last week period
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Button className="h-16 text-xl font-bold tracking-wide bg-[#00E396] hover:bg-[#00E396]/90 text-black transition-all duration-300">
                  Buy
                </Button>
                <Button className="h-16 text-xl font-bold tracking-wide bg-white/5 hover:bg-white/10 border border-[#00E396]/20 hover:border-[#00E396]/40 transition-all duration-300">
                  Sell
                </Button>
              </div>
            </div>

            <div className="glass-card p-8 rounded-lg mb-8 bg-gradient-to-br from-[#00E396]/5 to-transparent border border-[#00E396]/20">
              <div className="flex items-center gap-3 mb-4">
                <Bitcoin className="h-6 w-6 text-[#00E396]" />
                <h2 className="text-3xl font-bold text-white">My Portfolio</h2>
              </div>
              <p className="text-muted-foreground mb-6 bg-white/5 p-3 rounded-lg backdrop-blur-sm">
                Detailed view of your assets and performance
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {cryptoData.map((crypto) => (
                  <PriceCard key={crypto.symbol} {...crypto} />
                ))}
              </div>
            </div>

            <div className="glass-card p-8 rounded-lg mb-8 bg-gradient-to-br from-[#00E396]/5 to-transparent border border-[#00E396]/20">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-[#00E396]" />
                <h2 className="text-3xl font-bold text-white">Price Chart</h2>
              </div>
              <PriceChart />
            </div>
          </div>
        </main>
        <Chat />
      </div>
    </SidebarProvider>
  );
};

export default Index;