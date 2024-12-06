export interface RobloxUser {
  id: string;
  name: string;
  displayName: string;
  avatar: string;
}

const ROBLOX_CLIENT_ID = "1459545781691762140";
const ROBLOX_REDIRECT_URI = window.location.origin + "/redirect";
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mesa-exchange-backend.onrender.com' // Replace with your Render backend URL
  : 'http://localhost:3000';

export const useRobloxAuth = () => {
  console.log('Auth hook initialized');
  console.log('Current redirect URI:', ROBLOX_REDIRECT_URI);
  console.log('Current origin:', window.location.origin);
  console.log('Current pathname:', window.location.pathname);
  console.log('API URL:', API_URL);
  
  const isAuthenticated = localStorage.getItem('roblox_user') !== null;
  const user: RobloxUser | null = isAuthenticated ? JSON.parse(localStorage.getItem('roblox_user') || 'null') : null;

  const login = () => {
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('oauth_state', state);
    
    const authUrl = `https://apis.roblox.com/oauth/v1/authorize?client_id=${ROBLOX_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(ROBLOX_REDIRECT_URI)}&scope=openid+profile&state=${state}&nonce=${Math.random().toString(36).substring(7)}`;
    console.log('Starting OAuth flow');
    console.log('Auth URL:', authUrl);
    window.location.href = authUrl;
  };

  const handleCallback = async (code: string): Promise<void> => {
    console.log('Handling callback');
    console.log('Code received:', code);
    console.log('API URL:', API_URL);
    console.log('Redirect URI being sent:', ROBLOX_REDIRECT_URI);
    
    try {
      const response = await fetch(`${API_URL}/auth/roblox/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          code,
          redirect_uri: ROBLOX_REDIRECT_URI
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Authentication failed:', errorText);
        throw new Error(`Failed to authenticate: ${errorText}`);
      }

      const userData = await response.json();
      console.log('Authentication successful:', userData);
      localStorage.setItem('roblox_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('roblox_user');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('roblox_user');
    window.location.reload();
  };

  return { isAuthenticated, user, login, handleCallback, logout };
};