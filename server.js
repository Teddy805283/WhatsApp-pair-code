const express = require('express');
const path = require('path');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, delay } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/pair', async (req, res) => {
    const { number } = req.body;
    if (!number) return res.status(400).json({ error: "Number do bhai" });

    try {
        const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
        const sock = makeWASocket({
            auth: state,
            printQRInTerminal: false
        });

        sock.ev.on('creds.update', saveCreds);

        await delay(2000); // 2 sec wait
        const code = await sock.requestPairingCode(number);
        
        res.json({ code: code });
        
        sock.ws.close();

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Code nahi bana. Number sahi hai?" });
    }
});

app.listen(port, () => {
    console.log(`Server chal gaya port ${port} pe`)
});
