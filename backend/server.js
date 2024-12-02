require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 3000;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile`;
    res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;  // The authorization code from Roblox

    try {
        const response = await axios.post('https://apis.roblox.com/oauth/token', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI  // The same URI registered on Roblox
            },
            headers: {
                'Authorization': `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        // Use the access token to fetch user data

        // Optionally: Redirect the user to a success page
        res.redirect('/success');
    } catch (error) {
        console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
        res.status(500).send('An error occurred while processing your login.');
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
