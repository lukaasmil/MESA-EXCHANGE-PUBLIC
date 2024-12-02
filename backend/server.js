require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=profile`;
    res.redirect(authURL);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://apis.roblox.com/oauth/token', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
            }
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://apis.roblox.com/v1/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        res.json(userResponse.data);
    } catch (error) {
        res.status(500).send('Error authenticating');
    }
});

app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});
