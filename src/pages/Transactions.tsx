import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Shield } from "lucide-react";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";

const Transactions = () => {
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
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#00E396]/30">
                <img 
                  src="https://www.roblox.com/headshot-thumbnail/image?userId=1&width=50&height=50" 
                  alt="Roblox Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
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
              <h1 className="text-3xl font-bold mb-6">Recent Transactions</h1>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 glass-card">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">2024-03-05 12:30 PM</p>
                  </div>
                  <span className="text-[#00E396]">+$500.00</span>
                </div>
                <div className="flex items-center justify-between p-4 glass-card">
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