const socket = io.connect('https://chatterverse.herokuapp.com');
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
const botName = 'ChatCord Bot';
const chatContainer = document.querySelector('#chat-container');
const chatForm = document.querySelector('#chat-form');
const message = document.querySelector('#chat-form-message');

socket.emit('join-room', name);

function addMessage(message, author) {
    const div = document.createElement('div');
        div.classList.add('chat');
    const h3 = document.createElement('h3');
        h3.innerText = author;
    const p = document.createElement('p');
        p.innerText = message;
    div.appendChild(h3);
    div.appendChild(p);
    chatContainer.prepend(div);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addMessage(message.value, 'You');
    socket.emit('send-chat-message', {
        name,
        message: message.value
    });
    message.value = '';
});

socket.on('user-joined', (user) => {
    addMessage(`${user} has joined the chat!`, botName);
});

socket.on('chat-message', data => {
    addMessage(data.message, data.name);
});

socket.on('user-left', (user) => {
    addMessage(`${user} has left the chat. :(`, botName);
});
