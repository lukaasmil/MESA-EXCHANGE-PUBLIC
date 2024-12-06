import { ArrowDown, ArrowUp } from "lucide-react";

interface PriceCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

export const PriceCard = ({ symbol, name, price, change }: PriceCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-4 rounded-lg animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm text-muted-foreground">{name}</h3>
          <p className="text-xl font-bold">{symbol}</p>
        </div>
        <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-2xl font-bold">${price.toLocaleString()}</p>
    </div>
  );
};