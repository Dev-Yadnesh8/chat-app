// backend/websocket.ts
import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: Number(process.env.PORT) });

let userCount = 0;
type websocketsType = Record<string, WebSocket[]>; // { 'room1code':[socket1,socket2]}
let allSockets: websocketsType = {};

interface SocketModel {
  type: "create" | "join" | "chat" | "error" | "info" | "close";
  payload: {
    roomCode: string;
    message?: string;
    users?: number;
  };
}

wss.on("connection", (socket) => {
  userCount++;
  console.log("USER-CONNECTED-", userCount);

  socket.on("message", (message) => {
    let parsedMessage: SocketModel;

    try {
      parsedMessage = JSON.parse(message.toString());
    } catch (err) {
      const error: SocketModel = {
        type: "error",
        payload: {
          roomCode: "",
          message: "Invalid JSON format",
        },
      };
      return socket.send(JSON.stringify(error));
    }

    const { type, payload } = parsedMessage;
    const room = payload?.roomCode;

    if (!room) {
      const error: SocketModel = {
        type: "error",
        payload: {
          roomCode: "",
          message: "Room code missing",
        },
      };
      return socket.send(JSON.stringify(error));
    }

    switch (type) {
      case "create": {
        if (allSockets[room]) {
          const response: SocketModel = {
            type: "error",
            payload: {
              roomCode: room,
              message: "Room already exists",
            },
          };
          return socket.send(JSON.stringify(response));
        }
        allSockets[room] = [];
        console.log(`Room created: ${room}`);
        break;
      }

      case "join": {
        if (!allSockets[room]) {
          const response: SocketModel = {
            type: "error",
            payload: {
              roomCode: room,
              message: "Invalid or expired room code",
            },
          };
          return socket.send(JSON.stringify(response));
        }

        const sockets = allSockets[room];
        const alreadyJoined = sockets.includes(socket);
        const roomLimitReached = sockets.length >= 5;

        if (!alreadyJoined && !roomLimitReached) {
          sockets.push(socket);
          console.log(`Socket joined room ${room}`);
          console.log(`Total sockets in room ${room}: ${sockets.length}`);
        }

        const response: SocketModel = {
          type: roomLimitReached ? "error" : "info",
          payload: {
            roomCode: room,
            message: roomLimitReached ? "Room limit reached!" : "Joined room",
            users: sockets.length,
          },
        };
        socket.send(JSON.stringify(response));

        break;
      }

      case "chat": {
        const sockets = allSockets[room];
        if (!sockets) return;

        const chat: SocketModel = {
          type: "chat",
          payload: {
            roomCode: room,
            message: payload.message || "",
          },
        };

        sockets.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(chat));
          }
        });
        break;
      }

      default: {
        const error: SocketModel = {
          type: "error",
          payload: {
            roomCode: room,
            message: "Unknown message type",
          },
        };
        socket.send(JSON.stringify(error));
      }
    }
  });

  socket.on("close", () => {
    userCount--;
    console.log("USER-DISCONNECTED-", userCount);

    for (const room in allSockets) {
      allSockets[room] = allSockets[room].filter((s) => s !== socket);
      if (allSockets[room].length === 0) {
        delete allSockets[room];
      }
    }
  });
});
