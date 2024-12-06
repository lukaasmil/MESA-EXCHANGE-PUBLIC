import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Chat } from "@/components/Chat";
import { MarketHeader } from "@/components/MarketHeader";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";
import { PriceChart } from "@/components/PriceChart";
import { Button } from "@/components/ui/button";

const Trading = () => {
  const [showDepositMenu, setShowDepositMenu] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <MarketHeader onDepositClick={() => setShowDepositMenu(true)} />
          
          <div className="p-8 relative">
            {showDepositMenu && <DepositMenu onClose={() => setShowDepositMenu(false)} />}
            
            <div className="glass-card p-8 rounded-lg mb-8 bg-black/20 backdrop-blur-sm border border-white/5">
              <h1 className="text-3xl font-bold mb-6">Trading</h1>
              <div className="grid grid-cols-1 gap-8">
                <div className="glass-card p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/5">
                  <PriceChart />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/5">
                    <h2 className="text-xl font-bold mb-4">Buy</h2>
                    <Button className="w-full h-12 bg-[#00E396] hover:bg-[#00E396]/80 text-black font-bold">
                      Place Buy Order
                    </Button>
                  </div>
                  <div className="glass-card p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/5">
                    <h2 className="text-xl font-bold mb-4">Sell</h2>
                    <Button className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-bold">
                      Place Sell Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Chat />
      </div>
    </SidebarProvider>
  );
};

export default Trading;