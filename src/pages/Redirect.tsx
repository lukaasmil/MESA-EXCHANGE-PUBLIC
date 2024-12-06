import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRobloxAuth } from "@/utils/auth";
import { useToast } from "@/components/ui/use-toast";

const Redirect = () => {
  const { handleCallback } = useRobloxAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    console.log('=== OAuth Redirect Process Starting ===');
    console.log('Current URL:', window.location.href);
    console.log('Redirect component mounted');
    console.log('Current path:', location.pathname);
    console.log('Search params:', location.search);
    console.log('OAuth code present:', code ? 'Yes' : 'No');
    console.log('OAuth state present:', state ? 'Yes' : 'No');
    console.log('Expected state:', localStorage.getItem('oauth_state'));
    
    if (!code) {
      console.error('No OAuth code found in URL');
      toast({
        title: "Authentication Error",
        description: "No authentication code received. Please try again.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
      return;
    }

    // Verify state parameter matches
    const savedState = localStorage.getItem('oauth_state');
    if (state !== savedState) {
      console.error('State mismatch:', { received: state, saved: savedState });
      toast({
        title: "Authentication Error",
        description: "Invalid state parameter. Please try again.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
      return;
    }

    console.log('State verification passed, processing callback...');
    handleCallback(code)
      .then(() => {
        console.log('OAuth callback processed successfully');
        console.log('Redirecting to dashboard...');
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
  }, [location, handleCallback, navigate, toast]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Processing login...</h2>
        <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
};

export default Redirect;