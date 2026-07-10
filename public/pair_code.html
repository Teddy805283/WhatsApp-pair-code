<!DOCTYPE html>
<html>
<head>
<title>OWNER AJEET DOWN - Server</title>
<style>
  body { font-family: Arial; background:#f0f2f5; padding:20px; }
.card { background:#fff; padding:20px; border-radius:10px; max-width:650px; margin:auto; box-shadow:0 2px 10px rgba(0,0,0,0.1); }
  input, button { padding:12px; width:100%; margin:8px 0; border-radius:8px; border:1px solid #ccc; box-sizing:border-box; }
  button { background:#25D366; color:#fff; font-weight:bold; cursor:pointer; border:none; }
  button:hover { background:#1ebe57; }
  #pairCodeBox { font-size:45px; text-align:center; color:#25D366; letter-spacing:8px; margin:15px 0; font-weight:bold; }
.group { background:#f5f5f5; padding:12px; margin:8px 0; border-radius:8px; }
.copyBtn { float:right; width:auto; padding:6px 12px; background:#128C7E; }
</style>
</head>
<body>
<div class="card">
  <h2>📲 OWNER AJEET DOWN - WhatsApp Server</h2>

  <h3>Step 1: Connect Karo</h3>
  <input id="phone" placeholder="916387071869 - Country code ke saath">
  <button onclick="getPair()">Get Pair Code</button>
  <h1 id="pairCodeBox"></h1>
  <p id="status">Status: Disconnected ❌</p>

  <hr>
  <h3>Step 2: Group UID Finder</h3>
  <button onclick="loadGroups()">Load My Groups</button>
  <div id="groupList"></div>
</div>

<script>
const API = 'http://localhost:3000/api';

async function getPair() {
  const number = document.getElementById('phone').value;
  const res = await fetch(API + '/pair', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({number}) });
  const data = await res.json();
  document.getElementById('pairCodeBox').innerText = data.code || 'Error';
  alert('Ab WhatsApp > Settings > Linked Devices > Link with phone number me ye code dalo');
}

async function loadGroups() {
  document.getElementById('groupList').innerHTML = 'Loading...';
  const res = await fetch(API + '/groups');
  const data = await res.json();
  if(data.error) return alert(data.error);
  let html = '';
  data.groups.forEach(g => {
    html += `<div class="group">
      <b>${g.name}</b> - Members: ${g.members}<br>
      <small>UID: ${g.id}</small>
      <button class="copyBtn" onclick="copy('${g.id}')">Copy</button>
    </div>`;
  });
  document.getElementById('groupList').innerHTML = html;
}

function copy(id) {
  navigator.clipboard.writeText(id);
  alert('Copied: ' + id);
}

setInterval(async () => {
  const res = await fetch(API + '/status');
  const data = await res.json();
  document.getElementById('status').innerText = data.connected? 'Status: Connected ✅' : 'Status: Disconnected ❌';
}, 3000);
</script>
</body>
</html>
