require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 3000;

const CLIENT_ID = "6099093768007299381";
const CLIENT_SECRET = "RBX-G0YAntqZ3k2P6w8NCUgjW25bDNUEh_FeoXQYMSLoPTQc9c89_8oyIYUHCBieRzny";
const REDIRECT_URI = "https://mesa-exchange.onrender.com";

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/authorize?response_type=code&client_id=6099093768007299381&redirect_uri=https://mesa-exchange.onrender.com/callback&scope=profile`;
    res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;  // The authorization code from Roblox

    try {
        // Make the request to Roblox's OAuth token endpoint to exchange code for access token
        const response = await axios.post('https://apis.roblox.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI  // Should match what you've set in Roblox
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);

        // Use the access token to fetch user data or process further
        // e.g., fetch user info from Roblox's user endpoint using the access token
        const userData = await axios.get('https://apis.roblox.com/v1/users/me', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log('User Data:', userData.data);

        // Redirect the user after successful login
        res.redirect('/success');  // Redirect to a success page or dashboard

    } catch (error) {
        console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
        res.status(500).json({ errors: [{ message: error.message, code: error.response ? error.response.status : 0 }] });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
