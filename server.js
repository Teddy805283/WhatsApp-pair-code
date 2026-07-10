const express = require('express');
const cors = require('cors');
const { default: makeWASocket, useMultiFileAuthState, delay } = require('@whiskeysockets/baileys');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let sock;
let pairingCode = null;
let isConnected = false;

// BRANDING - TUMHARA DATA
const BRANDING = {
  youtubeLink: "https://youtube.com/@teddyrulex?si=JlzjKXF9csPs7Up5",
  message: "🔥 WhatsApp Server by OWNER AJEET DOWN\nChannel Subscribe karo ❤️"
};

if (!fs.existsSync('./auth_info')) fs.mkdirSync('./auth_info');
if (!fs.existsSync('./public')) fs.mkdirSync('./public');

async function connectToWhatsApp(phoneNumber = null) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: ['WhatsApp Server', 'Chrome', '1.0.0']
  });

  if(phoneNumber &&!sock.authState.creds.registered) {
    await delay(3000);
    try {
      pairingCode = await sock.requestPairingCode(phoneNumber);
      console.log("Pair Code:", pairingCode);
    } catch(e) { console.log(e) }
  }

  sock.ev.on('connection.update', (update) => {
    const { connection } = update;
    if(connection === 'open') {
      isConnected = true;
      pairingCode = null;
      console.log('✅ WhatsApp Connected');
    }
    if(connection === 'close') {
      isConnected = false;
      console.log('❌ Disconnected');
    }
  });
  sock.ev.on('creds.update', saveCreds);
}
connectToWhatsApp();

// 1. Pair Code API
app.post('/api/pair', async (req, res) => {
  const { number } = req.body;
  if(!number) return res.status(400).json({ error: 'Number required 9198...' });
  await connectToWhatsApp(number);
  setTimeout(() => res.json({ code: pairingCode }), 4000);
});

// 2. Status Check API
app.get('/api/status', (req, res) => res.json({ connected: isConnected }));

// 3. Group UID + Branding Bhejne wali API
app.get('/api/groups', async (req, res) => {
  if(!isConnected) return res.status(400).json({ error: 'Not connected' });

  const groups = await sock.groupFetchAllParticipating();
  let groupList = [];
  for(let key in groups) {
    groupList.push({
      id: groups[key].id,
      name: groups[key].subject,
      members: groups[key].participants.length
    });
  }

  // BRANDING SEND
  const myNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
  await sock.sendMessage(myNumber, { text: BRANDING.message + "\n\n" + BRANDING.youtubeLink });
  await delay(1000);

  if(fs.existsSync('./public/branding.jpg')){
    await sock.sendMessage(myNumber, {
      image: fs.readFileSync('./public/branding.jpg'),
      caption: "OWNER AJEET DOWN"
    });
  }

  res.json({ groups: groupList });
});

app.listen(3000, () => console.log('🚀 Server Chal Gaya: http://localhost:3000'));
