require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser()); // Use cookie-parser to handle cookies

const port = process.env.PORT || 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Ensure this is set in your .env

// Static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware to authenticate JWT tokens
function authenticateJWT(req, res, next) {
    const token = req.cookies.authToken; // Get the JWT token from the cookie

    if (!token) {
        return res.status(403).json({ message: 'Access Denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        req.user = user; // Store user info in the request object
        next(); // Proceed to the next middleware/route
    });
}

// Route to serve user information
app.get('/user-info', authenticateJWT, (req, res) => {
    res.json(req.user); // Send the authenticated user's information
});

// Main Route
app.get('/', (req, res) => {
    if (req.cookies.authToken) {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    }
});

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/v1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile`;
  
    console.log('Redirecting to:', authURL);
    res.redirect(authURL);
  });
  
// Callback Route - Exchange Authorization Code for Access Token
app.get('/callback', async (req, res) => {
    const code = String(req.query.code);
  
    if (!code) {
      return res.redirect(`/error?message=${encodeURIComponent('Authorization code not provided')}`);
    }
  
    try {
      const params = new URLSearchParams();
  
      params.append('grant_type', 'authorization_code');
      params.append('code', code);
      params.append('redirect_uri', REDIRECT_URI);
      params.append('client_id', CLIENT_ID);
      params.append('client_secret', CLIENT_SECRET);
  
      const tokenResponse = await axios.post('https://apis.roblox.com/oauth/v1/token', params);
      const accessToken = tokenResponse.data.access_token;
  
      const userResponse = await axios.get('https://apis.roblox.com/oauth/v1/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      console.log('User Data:', userResponse.data);
  
      // Create JWT token with userId and accessToken
      const token = jwt.sign(
        { 
          userId: userResponse.data.sub,  // Assuming 'sub' contains the user ID
          name: userResponse.data.name, 
          picture: userResponse.data.picture, 
          accessToken: accessToken 
        },
        JWT_SECRET,
        { expiresIn: '7d' } // Set token expiration to 7 days
      );
  
      // Send JWT token as an HTTP-only cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
  
      res.redirect('/');
    } catch (error) {
      console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
      res.redirect(`/error?message=${encodeURIComponent('Failed to authenticate')}`);
    }
  });
  

// Logout Route - Clear JWT Cookie
app.get('/logout', (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true,   // If using HTTPS
        sameSite: 'None',
    });
    res.redirect('/');
});

// Error Route
app.get('/error', (req, res) => {
    res.send(`<h1>Error</h1><p>${req.query.message}</p>`);
});

// CORS options to allow cross-origin requests
const corsOptions = {
    origin: ['https://mesa-exchange.onrender.com', 'https://mesacrypto.com'],
    credentials: true, // Allow cookies to be sent with requests
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/get-robux-balance', authenticateJWT, async (req, res) => {
    try {
      const userId = req.user.userId;
      const accessToken = req.user.accessToken;
  
      const response = await axios.get(`https://economy.roblox.com/v1/users/${userId}/currency`, {
        params: { access_token: accessToken },
      });
  
      console.log('Robux balance fetched:', response.data); // Debugging line
  
      res.json({ robux: response.data.robux });
    } catch (error) {
      console.error('Error fetching Robux balance:', error);
      res.status(500).json({ error: 'Failed to fetch Robux balance' });
    }
  });
  
  

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });