require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['https://mesa-exchange.onrender.com', 'https://mesacrypto.com'],
    credentials: true, 
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,          // Use HTTPS
        httpOnly: true,        // Protect against XSS
        sameSite: 'none',      // Allow cross-site cookies
        domain: '.mesacrypto.com', // Apply to custom domain
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
}));

app.use(express.static(path.join(__dirname, '..', 'public')));

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/v1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile`;
    console.log('Redirecting to:', authURL);
    res.redirect(authURL);
});

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

        req.session.user = {
            name: userResponse.data.name,
            picture: userResponse.data.picture,
        };

        console.log('Redirecting to mesacrypto.com after successful login');
        res.redirect('https://mesacrypto.com');
    } catch (error) {
        console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
        res.redirect(`/error?message=${encodeURIComponent('Failed to authenticate')}`);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error during logout:', err);
            res.send('Error logging out');
        } else {
            res.redirect('https://mesacrypto.com');
        }
    });
});

app.get('/error', (req, res) => {
    res.send(`<h1>Error</h1><p>${req.query.message}</p>`);
});

app.get('/user-info', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({});
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});