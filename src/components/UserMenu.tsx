import { Button } from "@/components/ui/button";
import { useRobloxAuth } from "@/utils/auth";
import { LogIn } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const UserMenu = () => {
  const { isAuthenticated, user, login, handleCallback } = useRobloxAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    
    console.log('Current path:', location.pathname);
    console.log('Auth status:', isAuthenticated);
    console.log('OAuth code present:', code ? 'Yes' : 'No');
    
    if (code && location.pathname === '/redirect') {
      console.log('Processing OAuth callback with code:', code);
      handleCallback(code)
        .then(() => {
          console.log('OAuth callback processed successfully');
          toast({
            title: "Successfully logged in",
            description: "Welcome to Mesa Exchange!",
          });
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          console.error('Error details:', {
            message: error.message,
            stack: error.stack
          });
          toast({
            title: "Login failed",
            description: "There was an error logging in. Please try again.",
            variant: "destructive",
          });
          navigate('/', { replace: true });
        });
    }
  }, [location, handleCallback, navigate, toast]);

  if (!isAuthenticated) {
    return (
      <Button 
        variant="outline" 
        className="gap-2 rounded-xl h-11 bg-[#00E396]/10 border-[#00E396]/30 text-[#00E396] hover:bg-[#00E396]/20"
        onClick={() => {
          console.log('Login button clicked');
          login();
        }}
      >
        <LogIn className="h-4 w-4" />
        <span>Log in with Roblox</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-card/50 px-4 py-2 rounded-xl border border-border/50">
      <div className="w-8 h-8 rounded-xl bg-[#00E396]/10 border border-[#00E396]/20 overflow-hidden">
        <img 
          src={user?.avatar} 
          alt={user?.displayName} 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-sm font-medium">{user?.displayName}</span>
    </div>
  );
};