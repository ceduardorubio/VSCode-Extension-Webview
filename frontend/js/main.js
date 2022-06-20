let myCurrentID = "";
let stored = localStorage.getItem('peerId');
if (stored) {
    myCurrentID = stored;
} else {
    myCurrentID = generateRandomString(32);
    localStorage.setItem('peerId', myCurrentID);
}

const peer = new Peer(myCurrentID);
let conn = null;

const title = document.getElementById('title');
const connectBtn = document.getElementById('connectBtn');
const partnerId = document.getElementById('partnerid');
const sendBtn = document.getElementById('sendBtn');
const state = document.getElementById('state');
const msg = document.getElementById('msg');
const clearBtn = document.getElementById('clearBtn');
const yournickname = document.getElementById('yournickname');
yournickname.addEventListener('keyup', (e) => {
    localStorage.setItem('nickname', yournickname.value);

});

let storedPartnerId = localStorage.getItem('peerPartnerId');
if (storedPartnerId) {
    partnerId.value = storedPartnerId;
}

let storedNick = localStorage.getItem('nickname');
if (storedNick) {
    yournickname.value = storedNick;
}

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

clearBtn.addEventListener('click', () => {
    localStorage.removeItem('messages');
    messageList = [];
    document.getElementById('messages').innerHTML = '';
});

peer.on('connection', function(c) {
    setConnectionActions(c);
});

function setConnectionActions(c) {

    c.on('open', () => {
        conn = c;
        state.innerHTML = 'Connected to' + c.peer;
        partnerId.value = c.peer;
        localStorage.setItem('peerPartnerId', c.peer);
        connectBtn.disabled = true;
        sendBtn.disabled = false;
        partnerId.disabled = true;
        msg.disabled = false;
        conn.on('data', function(data) {
            console.log(data);
            incomingMsg = data.replace('l', 'r');
            appendMessage(incomingMsg);
        });
    });

}

sendBtn.addEventListener('click', () => {
    let m = "l" + "::" + new Date().toLocaleString() + "::" + yournickname.value + "::" + msg.value;
    conn.send(m);
    appendMessage(m);
    msg.value = '';
});

msg.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        sendBtn.click();
    }
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


let messageList = [];

function onStart() {
    let listStored = localStorage.getItem('messages');
    if (listStored) {
        messageList = JSON.parse(listStored);
        for (let i = 0; i < messageList.length; i++) {
            appendMessage(messageList[i], false);
        }
    }
}

onStart();

function appendMessage(msg, store = true) {
    let row = createMessageRow(msg);
    document.getElementById('messages').appendChild(row);
    if (store) {
        messageList.push(msg);
        localStorage.setItem('messages', JSON.stringify(messageList));
    }

}

function createRow(className) {
    let row = document.createElement('div');
    row.classList.add('row');
    row.classList.add(className);

    return row;
}

function createColl(date, nickname, text) {
    let coll = document.createElement('div');
    coll.classList.add('vmessage');
    coll.innerHTML = `<div class="nickname">${nickname} say: </div><div class="text">${text}</div><div class="date">${date}</div>`;
    return coll;
}

function createMessageRow(msg) {
    let [origin, date, nickname, text] = msg.split('::');
    let typeClass = origin !== 'l' ? 'lc' : 'rc';
    let row = createRow(typeClass);
    row.appendChild(createColl(date, nickname, text));
    return row;
}