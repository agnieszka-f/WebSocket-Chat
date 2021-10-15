const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

messagesSection.classList.remove('show'); 

const login = function(event){
    if( userNameInput.value == '') alert('Username id empty!');
    else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

const sendMessage = function(event){
   messageContentInput.value == '' ? alert('Message is empty!'): addMessage(userName, messageContentInput.value);
   messageContentInput.value = '';
}

const addMessage = function(author, content){
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');

    author === userName ? message.classList.add('message--self') : '';

    message.innerHTML = `<h3 class="message__author">${author === userName ? 'You' : author}</h3>
                         <div class="message__content">${content}</div>`;

    messagesList.appendChild(message);
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    login(event); 
});

addMessageForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    sendMessage(event); 
});

