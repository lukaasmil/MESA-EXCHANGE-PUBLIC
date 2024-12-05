import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Chat } from "@/components/Chat";
import { DepositMenu } from "@/components/DepositMenu";
import { useState } from "react";
import { MarketHeader } from "@/components/MarketHeader";
import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";

const markets = [
  { 
    name: "DTIX",
    symbol: "DTIX",
    type: "CRYPTO",
    icon: "/lovable-uploads/4fbcc195-8b17-41b2-8d59-9fc3a446896b.png",
    price: "$42,384.21",
    change: "+2.34%",
    color: "blue-600"
  },
  { 
    name: "Ethereum",
    symbol: "ETH",
    type: "CRYPTO",
    icon: "/crypto-logos/ethereum.png",
    price: "$2,274.63",
    change: "+3.56%",
    color: "purple"
  },
  { 
    name: "Solana",
    symbol: "SOL",
    type: "CRYPTO",
    icon: "/crypto-logos/solana.png",
    price: "$98.76",
    change: "+5.23%",
    color: "green"
  },
  { 
    name: "BNB Chain",
    symbol: "BNB",
    type: "CRYPTO",
    icon: "/crypto-logos/bnb.png",
    price: "$308.45",
    change: "-1.12%",
    color: "yellow"
  },
  { 
    name: "Cardano",
    symbol: "ADA",
    type: "CRYPTO",
    icon: "/crypto-logos/cardano.png",
    price: "$0.5123",
    change: "+1.45%",
    color: "blue"
  },
  { 
    name: "XRP",
    symbol: "XRP",
    type: "CRYPTO",
    icon: "/crypto-logos/xrp.png",
    price: "$0.5645",
    change: "-0.78%",
    color: "blue"
  }
];

const Markets = () => {
  const [showDepositMenu, setShowDepositMenu] = useState(false);

  const handleCopy = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    toast.success(`${symbol} copied to clipboard`);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <MarketHeader onDepositClick={() => setShowDepositMenu(true)} />
          
          <div className="p-8">
            {showDepositMenu && <DepositMenu onClose={() => setShowDepositMenu(false)} />}
            
            <div className="glass-card p-8 rounded-lg mb-8">
              <h1 className="text-3xl font-bold mb-6">Markets</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {markets.map((market) => (
                  <div key={market.symbol} className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute top-3 left-3 w-10 h-10 z-10 opacity-90">
                      <img
                        src={market.icon}
                        alt={`${market.name} logo`}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>

                    <div className={`relative glass-card p-6 ${
                      market.name === "DTIX" 
                        ? "bg-blue-600/5 hover:bg-blue-600/10 border-blue-600/20 shadow-lg shadow-blue-600/20" 
                        : `bg-${market.color}/5 hover:bg-${market.color}/10 border-${market.color}/20`
                    }`}>
                      <div className="relative z-10">
                        <div className="flex flex-col gap-4">
                          <div className="flex items-start justify-between">
                            <div className="flex flex-col ml-14">
                              <p className="text-sm text-gray-400 uppercase tracking-wider">{market.type}</p>
                              <h3 className="text-lg font-bold text-white mt-1">{market.name}</h3>
                              {market.name === "DTIX" && (
                                <p className="text-sm text-gray-400 mt-1">Dress To Impress</p>
                              )}
                              <p className="text-2xl font-bold text-[#00ff9d] mt-2">{market.price}</p>
                              <p className={`text-sm mt-1 ${market.change.startsWith('+') ? 'text-[#00ff9d]' : 'text-red-500'}`}>
                                {market.change}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                onClick={() => handleCopy(market.symbol)}
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <a 
                                href={`https://www.coingecko.com/en/coins/${market.name.toLowerCase()}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
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

export default Markets;
