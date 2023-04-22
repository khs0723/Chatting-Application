const authSocket = require('./middleware/authSocket');
const newConnectionHandler = require('./socketHandlers/newConnectionHandler');
const disconnectionHandler = require('./socketHandlers/disconnectionHandler');
const directMessageHandler = require('./socketHandlers/directMessageHandler');
const serverStore = require('./serverStore');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const roomJoinHandler = require('./socketHandlers/roomJoinHandler');
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler')
const roomInitializeConnectionHandler = require('./socketHandlers/roomInitializeConnectionHandler')
const roomSignalingDataHandler = require('./socketHandlers/roomSignalingDataHandler')


const registerSocketServer = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'Post']
        }
    });

    serverStore.setSocketServerInstance(io);

    io.use((socket, next) => {
        authSocket(socket, next);
    });

    const emitOnlineUsers = () => {
        const onlineUsers = serverStore.getOnlineUsers();
        io.emit('online-users', {onlineUsers});
    };

    io.on('connection', (socket) => {
        console.log('user connected');
        console.log(socket.id);

        // new connection handler
        newConnectionHandler(socket, io);
        emitOnlineUsers();

        socket.on('direct-message', (data) => {
            directMessageHandler(socket, data);
        });

        socket.on('direct-chat-history', (data) => {
            directChatHistoryHandler(socket, data);
        });

        socket.on('room-create', (data) => {
            roomCreateHandler(socket, data);
        });

        socket.on('room-join', (data) => {
            roomJoinHandler(socket, data);
        });

        socket.on('room-leave', (data) => {
            roomLeaveHandler(socket, data)
        })

        socket.on('conn-init', data => {
            roomInitializeConnectionHandler(socket, data)
        })

        socket.on('conn-signal', data => {
            roomSignalingDataHandler(socket, data)
        })

        socket.on('disconnect', () => {
            disconnectionHandler(socket);
        });

    });


    setInterval(() => {
        emitOnlineUsers();
    }, [8000]);
};

module.exports = {
    registerSocketServer
};
