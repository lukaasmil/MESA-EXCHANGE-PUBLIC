import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Chat } from "@/components/Chat";
import { MarketHeader } from "@/components/MarketHeader";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";
import { MarketCard } from "@/components/MarketCard";

const markets = [
  { 
    name: "DTIX",
    symbol: "DTIX",
    type: "CRYPTO",
    icon: "/lovable-uploads/4fbcc195-8b17-41b2-8d59-9fc3a446896b.png",
    price: "$42,384.21",
    change: "+2.34%",
  },
  { 
    name: "AMX",
    symbol: "AMX",
    type: "CRYPTO",
    icon: "/crypto-logos/ethereum.png",
    price: "$2,274.63",
    change: "+3.56%",
    color: "blue-600"
  },
  { 
    name: "ADOPT ME",
    symbol: "ADOPT",
    type: "CRYPTO",
    icon: "/crypto-logos/solana.png",
    price: "$98.76",
    change: "+5.23%",
    color: "blue-600"
  },
  { 
    name: "PETS",
    symbol: "PETS",
    type: "CRYPTO",
    icon: "/crypto-logos/bnb.png",
    price: "$308.45",
    change: "-1.12%",
    color: "blue-600"
  },
  { 
    name: "PET SIMULATOR",
    symbol: "PETSIM",
    type: "CRYPTO",
    icon: "/crypto-logos/cardano.png",
    price: "$0.5123",
    change: "+1.45%",
    color: "blue-600"
  },
  { 
    name: "BLX",
    symbol: "BLX",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  },
  { 
    name: "BLOXBURG",
    symbol: "BLOX",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  },
  { 
    name: "PLSD",
    symbol: "PLSD",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  },
  { 
    name: "PLS DONATE",
    symbol: "PLS",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  },
  { 
    name: "MESX",
    symbol: "MESX",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  },
  { 
    name: "MESA MAIN COIN",
    symbol: "MESA",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue-600"
  }
];

const Markets = () => {
  const [showDepositMenu, setShowDepositMenu] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <MarketHeader onDepositClick={() => setShowDepositMenu(true)} />
          
          <div className="p-8">
            {showDepositMenu && <DepositMenu onClose={() => setShowDepositMenu(false)} />}
            
            <div className="glass-card p-8 rounded-lg mb-8 bg-black/20 backdrop-blur-sm border border-white/5">
              <h1 className="text-3xl font-bold mb-6">Markets</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets.map((market) => (
                  <MarketCard key={market.symbol} {...market} />
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

export default Markets;
