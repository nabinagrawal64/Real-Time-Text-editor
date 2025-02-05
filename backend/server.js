const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const dbConnect = require("./config/database");  
const routes = require('./routes/room');

const app = express();
app.use(cors());
app.use(express.json()); 
dbConnect();

app.use('/api', routes); 

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let document = "";

wss.on("connection", (ws) => {

    console.log("Connected to WebSocket server");

    ws.send(JSON.stringify({ type: 'init', data: document}));

    ws.on("message", (data) => {
        try{
            const message = JSON.parse(data);
            if(message.type === 'update'){
                document = message.data;
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'update', data: document }));
                    }
                });
            }
            console.log(`Received message: ${message.type}`);
        } catch(error) {
            console.error(`Error parsing message: ${error.message}`);
        }
    });

    ws.on("close", () => {
        console.log("Disconnected from WebSocket server");
    });
})

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
