import { Button } from "./ui/button";
import { CreditCard, Bitcoin, Wallet, DollarSign } from "lucide-react";

interface DepositMenuProps {
  onClose: () => void;
}

export const DepositMenu = ({ onClose }: DepositMenuProps) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="glass-card p-8 rounded-lg animate-fade-in max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="w-8 h-8 text-[#00E396]" />
          <h2 className="text-2xl font-bold">Deposit Methods</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="h-16 text-lg flex items-center gap-3 hover:bg-[#00E396]/10 border-[#00E396]/20 hover:border-[#00E396] transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#00E396]/10 flex items-center justify-center group-hover:bg-[#00E396]/20 transition-all">
              <img src="/robux-icon.png" alt="Robux" className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Deposit with Robux</div>
              <div className="text-sm text-muted-foreground">Min. deposit: 100 R$</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-16 text-lg flex items-center gap-3 hover:bg-purple-500/10 border-purple-500/20 hover:border-purple-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
              <CreditCard className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Credit Card</div>
              <div className="text-sm text-muted-foreground">Visa/Mastercard accepted</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-16 text-lg flex items-center gap-3 hover:bg-orange-500/10 border-orange-500/20 hover:border-orange-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-all">
              <Bitcoin className="w-6 h-6 text-orange-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Cryptocurrency</div>
              <div className="text-sm text-muted-foreground">BTC, ETH, USDT & more</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-16 text-lg flex items-center gap-3 hover:bg-blue-500/10 border-blue-500/20 hover:border-blue-500 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Bank Transfer</div>
              <div className="text-sm text-muted-foreground">SEPA, Wire & ACH</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};