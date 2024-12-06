const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mesa-exchange.lovable.dev'  // Replace with your frontend URL
    : 'http://localhost:5173',
  credentials: true
}));

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.send('Mesa Exchange Backend is running!');
});

// Roblox OAuth callback endpoint
app.post('/auth/roblox/callback', async (req, res) => {
  try {
    const { code, redirect_uri } = req.body;
    
    console.log('Received callback request:', {
      code: code ? 'present' : 'missing',
      redirect_uri
    });

    // Exchange code for access token
    const tokenResponse = await axios.post('https://apis.roblox.com/oauth/v1/token', {
      client_id: process.env.ROBLOX_CLIENT_ID,
      client_secret: process.env.ROBLOX_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const { access_token } = tokenResponse.data;

    // Get user info using the access token
    const userResponse = await axios.get('https://apis.roblox.com/oauth/v1/userinfo', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const userData = userResponse.data;

    // Get user avatar
    const avatarResponse = await axios.get(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${userData.sub}&size=420x420&format=Png`);
    const avatarUrl = avatarResponse.data.data[0]?.imageUrl || '';

    // Prepare user data for frontend
    const user = {
      id: userData.sub,
      name: userData.nickname,
      displayName: userData.preferred_username || userData.name,
      avatar: avatarUrl
    };

    res.json(user);
  } catch (error) {
    console.error('Auth error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Authentication failed',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});