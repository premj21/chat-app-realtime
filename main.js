const io = require('socket.io')(8000,{
    cors: {
        origin:'*',
    }
})

const users = {};

io.on('connection',socket=>{

    socket.on('newuser', myname=>{
        users[socket.id] =myname;
        socket.broadcast.emit('userjoin',myname);
    })
    socket.on('disconnect', message=>{

            socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    })
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, myname: users[socket.id]})
    })
})


