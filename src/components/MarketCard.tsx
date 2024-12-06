import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface MarketCardProps {
  name: string;
  symbol: string;
  type: string;
  icon: string;
  price: string;
  change: string;
}

export const MarketCard = ({
  name,
  symbol,
  type,
  icon,
  price,
  change,
}: MarketCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(symbol);
    toast.success(`${symbol} copied to clipboard`);
  };

  return (
    <div className="relative group overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="absolute top-3 left-3 w-10 h-10 z-10 opacity-90">
        <img
          src={icon}
          alt={`${name} logo`}
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <div className="relative glass-card p-6 rounded-xl bg-blue-600/5 backdrop-blur-sm border border-blue-600/20 shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20 transition-all duration-300">
        <div className="relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col ml-14">
                <p className="text-sm text-gray-400 uppercase tracking-wider">{type}</p>
                <h3 className="text-lg font-bold text-white mt-1">{name}</h3>
                <p className="text-2xl font-bold text-[#00ff9d] mt-2">{price}</p>
                <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-[#00ff9d]' : 'text-red-500'}`}>
                  {change}
                </p>
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