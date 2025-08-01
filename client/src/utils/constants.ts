export const APPNAME:string = "Charcha"

export interface SocketModel {
  type: "create" | "join" | "chat" | "error" | "info" | "leave";
  payload: {
    roomCode: string;
    message?: string;
    users?: number;
  };
}