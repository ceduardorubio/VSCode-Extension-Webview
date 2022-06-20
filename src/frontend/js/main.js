const myCurrentID = generateRandomString(32);
const peer = new Peer(myCurrentID);
let conn = null;


const title = document.getElementById('title');
const connectBtn = document.getElementById('connectBtn');
const partnerId = document.getElementById('partnerId');
const sendBtn = document.getElementById('SendBtn');
const state = document.getElementById('state');
const msg = document.getElementById('msg');

title.innerHTML = 'Tu Id es: ' + myCurrentID;
state.innerHTML = 'Disconnected';

connectBtn.addEventListener('click', () => {
    let id = partnerId.value;
    if (partnerId.length !== 32) {
        alert('Wrong partner id');
    } else {
        let c = peer.connect(id);
        setConnectionActions(c);
    }
});

peer.on('connection', function(c) {
    SetConnectionActions(c);
});

function setConnectionActions(c) {
    state.innerHTML = 'Connected';
    conn = c;
    conn.on('open', () => {
        console.log('Connected');
        connectBtn.disabled = true;
        sendBtn.disabled = false;
    });
    conn.on('data', function(data) {
        appendMessage(data);
    });
}

sendBtn.addEventListener('click', () => {
    let msg = msg.value;
    conn.send(msg.value);
});


function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function appendMessage(msg) {
    let message = document.createElement('div');
    message.innerHTML = msg;
    document.getElementById('messages').appendChild(message);
}