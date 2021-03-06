const socketio = require('socket.io');
const parseStringAsrray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance');
const connections = [];

let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);
    io.on('connection', socket => {
        // console.log(socket.id);
        // console.log(socket.handshake.query);
        // setTimeout(() =>{
        //     socket.emit('message', 'Hello Dev ')
        // }, 3000);

        const { latitude, longitude, techs } = socket.handshake.query;
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsrray(techs),
        });

    });

};

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item))

    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}