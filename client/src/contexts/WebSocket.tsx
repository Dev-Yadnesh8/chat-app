// src/contexts/WebSocketContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import type { SocketModel } from "../utils/constants";

type WebSocketContextType = {
  ws: WebSocket | null;
  status: "connecting" | "open" | "closed" | "error";
  sendMessage: (data: SocketModel) => void;
  lastMessage: any;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] =
    useState<WebSocketContextType["status"]>("connecting");
  const [lastMessage, setLastMessage] = useState<any>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(import.meta.env.VITE_BACKEND_URL);

    ws.onopen = () => {
      console.log("✅ WebSocket connection opened");
      setStatus("open");
    };

    ws.onclose = () => {
      console.log("❌ WebSocket connection closed");
      setStatus("closed");
    };

    ws.onerror = (e) => {
      console.error("⚠️ WebSocket error", e);
      setStatus("error");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 New message from server:", data);
      setLastMessage(data);
    };

    wsRef.current = ws;
  }, []);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket not ready yet.");
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ ws: wsRef.current, status, sendMessage,lastMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
};
