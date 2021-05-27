
const
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io");

let os = require('os')
let osu = require('node-os-utils')
var netstat = osu.netstat

const SERVER_PORT = 3000;

let nextVisitorNumber = 1;
const onlineClients = new Set();


function onNewWebsocketConnection(socket) {
    console.info(`Socket ${socket.id} has connected.`);
    onlineClients.add(socket.id);

    socket.on("disconnect", () => {
        onlineClients.delete(socket.id);
        console.info(`Socket ${socket.id} has disconnected.`);
    });
    setInterval(() => {
        netstat.inOut()
        .then(info => {
            socket.emit("test", {
                cpu: os.cpus(),
                mem: os.totalmem(),
                memf: os.freemem(),
                netinfo: info
            }
                , result => {
                console.log(result)
            })
        })
        
    },1000)
    

    // echoes on the terminal every "hello" message this socket sends
    socket.on("hello", helloMsg => console.info(`Socket ${socket.id} says: "${helloMsg}"`));

    // will send a message only to this socket (different than using `io.emit()`, which would broadcast it)
    socket.emit("welcome", `Welcome! You are visitor number ${nextVisitorNumber++}`);
}

function startServer() {
    // create a new express app
    const app = express();
    // create http server and wrap the express app
    const server = http.createServer(app);
    // bind socket.io to that server
    const io = socketio(server);

    // example on how to serve static files from a given folder
    app.use(express.static("public"));

    // will fire for every new websocket connection
    io.on("connection", onNewWebsocketConnection);

    // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
    server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));

    // will send one message per second to all its clients
    let secondsSinceServerStarted = 0;
    setInterval(() => {
        secondsSinceServerStarted++;
        io.emit("seconds", secondsSinceServerStarted);
        io.emit("online", onlineClients.size);
    }, 1000);
}

startServer();
