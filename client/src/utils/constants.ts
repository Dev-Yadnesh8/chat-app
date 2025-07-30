export const APPNAME:string = "Charcha"

export interface SocketModel {
  type: "create" | "join" | "chat" | "error" | "info" | "close";
  payload: {
    roomCode: string;
    message?: string;
    users?: number;
  };
}