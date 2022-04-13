const socket = io('http://localhost:8000')
const form = document.getElementById('send-div');
const inputmsg = document.getElementsByClassName('text')[0];
const contain = document.getElementsByClassName('container')[0];


const append = (message,position)=>{
    const newmsg = document.createElement('div');
    newmsg.innerText = message;
    newmsg.classList.add('mssg');
    newmsg.classList.add(position);
    contain.append(newmsg);
    if(position == 'left'){
        audio.play();
    }
    scrcolltobottom00();
}
var audio = new Audio('ring2.mp3');
const myname = prompt('Enter Your Name');   ///   1

socket.emit('newuser',myname);
socket.on('userjoin',myname=>{
    append(`${myname} joined the chat`,'left')
});


socket.on('receive',data=>{
    append(`${data.myname}: ${data.message}`,'left')
    // scrcolltobottom00();
})
socket.on('left',myname=>{
    append(`${myname} leave the chat`,'left')
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = inputmsg.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    inputmsg.value = ''
})


function scrcolltobottom00() {
    contain.scrollTop = contain.scrollHeight;
}



