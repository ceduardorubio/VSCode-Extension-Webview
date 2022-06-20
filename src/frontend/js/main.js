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
    let id = document.getElementById('id').value;
    conn = peer.connect(id);
    conn.on('open', () => {
        let msg = document.getElementById('msg').value;
        conn.send(msg);
    });
});