const myCurrentID = generateRandomString(32);
const peer = new Peer(myCurrentID);
let conn = null;


const title = document.getElementById('title');
const connectBtn = document.getElementById('connectBtn');
const partnerId = document.getElementById('partnerid');
const sendBtn = document.getElementById('sendBtn');
const state = document.getElementById('state');
const msg = document.getElementById('msg');
const yournickname = document.getElementById('yournickname');

title.innerHTML = 'Tu Id es: ' + myCurrentID;
state.innerHTML = 'Disconnected';

connectBtn.addEventListener('click', () => {
    let id = partnerId.value;
    if (partnerId.value.length !== 32) {
        alert('Wrong partner id');
    } else {
        let c = peer.connect(id);
        setConnectionActions(c);
    }
});

peer.on('connection', function(c) {
    setConnectionActions(c);
});

function setConnectionActions(c) {
    state.innerHTML = 'Connected to' + c.peer;
    conn = c;
    conn.on('open', () => {
        connectBtn.disabled = true;
        sendBtn.disabled = false;
        partnerId.disabled = true;
        msg.disabled = false;
        conn.on('data', function(data) {
            appendMessage(data);
        });
    });

}

sendBtn.addEventListener('click', () => {
    let m = new Date().toLocaleString() + "- " + yournickname.value + ": " + msg.value;
    conn.send(m);
    appendMessage(m);
    msg.value = '';
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