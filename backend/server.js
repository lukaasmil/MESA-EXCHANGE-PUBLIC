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

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Mesa Exchange</h1><a href="/login">Log in with Roblox</a>');
});

app.get('/login', (req, res) => {
    const authURL = `https://apis.roblox.com/oauth/v1/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=openid%20profile%20assets:read%20creator-store-product:read%20creator-store-product:writes`;
    console.log('Redirecting to:', authURL);
    res.redirect(authURL);
});


app.get('/callback', async (req, res) => {
    const code = String(req.query.code);

    if (!code) {
        return res.redirect(`/error?message=${encodeURIComponent('Authorization code not provided')}`);
    }

    try {
        const params = new URLSearchParams()

        params.append(`grant_type`, 'authorization_code')
        params.append(`code`, code)
        params.append(`redirect_uri`, REDIRECT_URI)
        params.append(`client_id`, CLIENT_ID)
        params.append(`client_secret`, CLIENT_SECRET)
        
        const tokenResponse = await axios.post('https://apis.roblox.com/oauth/v1/token', params);

        const accessToken = tokenResponse.data.access_token;


        const userResponse = await axios.get('https://apis.roblox.com/oauth/v1/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        console.log('User  Data:', userResponse.data);

        res.redirect('/success');

    } catch (error) {
        console.error('Error during OAuth exchange:', error.response ? error.response.data : error);
        res.redirect(`/error?message=${encodeURIComponent('Failed to authenticate')}`);
    }
});

app.get('/success', (req, res) => {
    res.send('<h1>Login Successful!</h1>');
});

app.get('/error', (req, res) => {
    res.send(`<h1>Error</h1><p>${req.query.message}</p>`);
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});

const corsOptions = {
    origin: 'https://mesa-exchange.onrender.com', 
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));