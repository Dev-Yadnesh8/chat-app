import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({ port: Number(process.env.PORT) });

let userCount = 0;
let allSockets:WebSocket[] = [];

wss.on("connection",(socket)=>{
    allSockets.push(socket);
    userCount++;
    console.log("USER-CONNECTED-",userCount);

    socket.on("message",(message)=>{
        console.log("Incoming message ,",message.toString());
        allSockets.forEach((s)=>s.send(message.toString()+"form server received"));
    })

    
});