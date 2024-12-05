import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Shield } from "lucide-react";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";
import { PriceChart } from "@/components/PriceChart";

const Trading = () => {
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
              <span className="text-sm text-muted-foreground">Mesa Exchange</span>
            </div>
            
            <div className="flex items-center gap-3 mr-4">
              <div className="w-8 h-8 rounded-full border border-[#00E396]/30 bg-card/50"></div>
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
          
          <div className="p-8 relative">
            {showDepositMenu && <DepositMenu onClose={handleCloseDeposit} />}
            
            <div className="glass-card p-8 rounded-lg mb-8">
              <h1 className="text-3xl font-bold mb-6">Trading</h1>
              <div className="grid grid-cols-1 gap-8">
                <div className="glass-card p-6 rounded-lg">
                  <PriceChart />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-4">Buy</h2>
                    <Button className="w-full h-12 bg-[#00E396] hover:bg-[#00E396]/80 text-black font-bold">
                      Place Buy Order
                    </Button>
                  </div>
                  <div className="glass-card p-6 rounded-lg">
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