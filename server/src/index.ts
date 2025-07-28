import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: Number(process.env.PORT) });

let userCount = 0;
type websocketsType = Record<string, WebSocket[]>; // { 'room1code':[socket1,socket2]}
let allSockets: websocketsType = {};

interface ServerRes {
  type: "chat";
  payload: {
    message: string;
  };
}

wss.on("connection", (socket) => {
  // allSockets.push(socket);
  userCount++;
  console.log("USER-CONNECTED-", userCount);

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());
    console.log(parsedMessage);
    
    const { type, payload } = parsedMessage;

    if (type === "join") {
      const room = payload.roomCode;

      if (!allSockets[room]) {
        allSockets[room] = [];
      }
      allSockets[room].push(socket);
      console.log(`Socket joined room ${room}`);
      console.log(`Total sockets in room ${room}:`, allSockets[room].length);
    } else if (type === "chat") {
      const room = payload.roomCode;
      const message = payload.message;
      const sharedRoom = allSockets[room];
      const response:ServerRes = {
        type: "chat",
        payload: {
          message: message.toString(),
        },
      };
      sharedRoom.forEach((e) => e.send(JSON.stringify(response)));
    }
  });

  socket.on("close", (client) => {});
});
