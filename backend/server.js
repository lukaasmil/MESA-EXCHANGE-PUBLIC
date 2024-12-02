require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 3000;

// Load sensitive data from .env
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Route to initiate OAuth login
app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile`;
    res.redirect(authURL);
});

// Callback route to handle the authorization code and exchange for an access token
app.get('/callback', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.redirect(`/error?message=${encodeURIComponent('Authorization code not provided')}`);
    }

    try {
        const tokenResponse = await axios.post('https://apis.roblox.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = tokenResponse.data.access_token;

        // Optional: Fetch user data from Roblox API
        const userResponse = await axios.get('https://apis.roblox.com/v1/users/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log('User Data:', userResponse.data);

        // Redirect the user to a success page
        res.redirect('/success');

    } catch (error) {
        console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
        res.redirect(`/error?message=${encodeURIComponent('Failed to authenticate')}`);
    }
});

// Example success route
app.get('/success', (req, res) => {
    res.send('<h1>Login Successful!</h1>');
});

// Example error route
app.get('/error', (req, res) => {
    res.send(`<h1>Error</h1><p>${req.query.message}</p>`);
});

// Start the server
app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
