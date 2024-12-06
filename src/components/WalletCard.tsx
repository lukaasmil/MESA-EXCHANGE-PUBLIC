import { Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface WalletCardProps {
  name: string;
  symbol: string;
  type: string;
  icon: string;
  bgColor: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export const WalletCard = ({
  name,
  symbol,
  type,
  icon,
  bgColor,
  price,
  change,
  isPositive,
}: WalletCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(symbol);
    toast.success(`${symbol} copied to clipboard`);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Large glowing coin logo */}
      <div className="absolute -top-4 -left-4 w-32 h-32 coin-icon-glow z-10">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Dark gradient background */}
      <div className={`relative glass-card p-6 ${bgColor}`}>
        <div className="relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col ml-24"> {/* Offset for the large logo */}
                <p className="text-sm text-gray-400 uppercase tracking-wider">{type}</p>
                <h3 className="text-lg font-bold text-white mt-1">{name}</h3>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a 
                  href={`https://www.coingecko.com/en/coins/${name.toLowerCase()}`} 
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
  );
};