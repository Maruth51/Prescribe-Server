"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const user_1 = require("./user");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let orderAvailStatus = {
    pizza: true,
    coke: true,
};
wss.on('connection', (ws) => {
    ws.on('message', (msg) => {
        const data = JSON.parse(msg);
        console.log(data);
        orderAvailStatus["pizza"] = data.hasOwnProperty('pizza') ? data.pizza : orderAvailStatus.pizza;
        orderAvailStatus["coke"] = data.hasOwnProperty('coke') ? data.coke : orderAvailStatus.coke;
        console.log(orderAvailStatus);
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                console.log("client");
                client.send(JSON.stringify(orderAvailStatus));
            }
        });
    });
    ws.send(JSON.stringify(orderAvailStatus));
});
const broadCast = (socket) => {
    wss.clients.forEach((client) => {
        if (client.readyState === socket.OPEN) {
            client.send(JSON.stringify(orderAvailStatus));
        }
    });
};
app.use(express.json());
app.get('/', (req, res) => {
    res.send('from HTTP Protocal');
});
app.post('/Login', user_1.Login);
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address()} :)`);
});
//# sourceMappingURL=server.js.map