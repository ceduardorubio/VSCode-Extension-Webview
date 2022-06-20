function generateRandomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const myCurrentID = generateRandomString(32);
const title = document.getElementById('title');
title.innerHTML = 'Tu Id es: ' + myCurrentID;


let peer = new Peer(myCurrentID);
let conn = null;
let connectBtn = document.getElementById('connectBtn');
connectBtn.addEventListener('click', () => {
    let partnerId = document.getElementById('partnerId').value;
    if (partnerId.length !== 32) {
        alert('Wrong partner id');
    } else {
        let c = peer.connect(partnerId);
        setConnectionActions(c);
    }
});

peer.on('connection', function(c) {
    SetConnectionActions(c);
});


conn.on('open', () => {
    console.log('Connected');
    connectBtn.disabled = true;
});

let sendBtn = document.getElementById('SendBtn');
sendBtn.addEventListener('click', () => {
    let data = document.getElementById('data').value;
    conn.send(data);
});


document.getElementById('state').innerHTML = 'Disconnected';

function setConnectionActions(c) {
    document.getElementById('state').innerHTML = 'Connected';
    conn = c;
    conn.on('data', function(data) {
        console.log(data);
    });
}