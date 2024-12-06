import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Chat } from "@/components/Chat";
import { MarketHeader } from "@/components/MarketHeader";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";

const Transactions = () => {
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
              <h1 className="text-3xl font-bold mb-6">Recent Transactions</h1>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-card bg-black/40 backdrop-blur-sm border border-white/5">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">2024-03-05 12:30 PM</p>
                  </div>
                  <span className="text-[#00E396]">+$500.00</span>
                </div>
                <div className="flex items-center justify-between p-4 glass-card bg-black/40 backdrop-blur-sm border border-white/5">
                  <div>
                    <p className="font-medium">Withdrawal</p>
                    <p className="text-sm text-muted-foreground">2024-03-04 3:45 PM</p>
                  </div>
                  <span className="text-red-500">-$200.00</span>
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

export default Transactions;