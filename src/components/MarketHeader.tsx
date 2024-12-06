import { Shield, Wallet, Download } from "lucide-react";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";

interface MarketHeaderProps {
  onDepositClick: () => void;
}

export const MarketHeader = ({ onDepositClick }: MarketHeaderProps) => {
  return (
    <div className="flex justify-end items-center gap-4 p-4 border-b border-border/40">
      <div className="flex items-center gap-2 mr-auto">
        <Shield className="h-5 w-5 text-[#00E396]" />
        <span className="text-sm text-muted-foreground">Mesa Exchange</span>
      </div>
      
      <UserMenu />

      <Button variant="outline" className="gap-2">
        <Wallet className="h-4 w-4" />
        <span className="text-foreground">$0.00</span>
      </Button>
      
      <Button 
        variant="outline" 
        className="gap-2 deposit-button"
        onClick={onDepositClick}
      >
        <Download className="h-4 w-4" />
        <span>Deposit</span>
      </Button>
    </div>
  );
};