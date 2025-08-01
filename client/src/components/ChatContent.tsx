import { useEffect, useState } from "react";
import Button from "./Buttons/Button";
import Container from "./Container";
import InputField from "./InputField";
import { useWebSocket } from "../contexts/WebSocket";
import type { SocketModel } from "../utils/constants";
import Message from "./Message";
import IconButton from "./Buttons/IconButton";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ChatContent() {
  const [input, setInput] = useState("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [usersConnected, setUsersConnected] = useState<number>(0);
  const [chat, setChat] = useState<string[]>([]);
  const navigate = useNavigate();

  const { ws, status, sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    console.log("last message -- ", lastMessage);
    if (!lastMessage) return;

    const { type, payload } = lastMessage;

    if (type === "info") {
      setRoomCode(payload.roomCode);
      setUsersConnected(payload.users);
      alert(payload.message);
    }

    if (type === "chat") {
      // push message to local chat state
      setChat((prev) => [...prev, payload.message]);
    }

    if (type === "error") {
      alert(payload.message);
    }
  }, [lastMessage]);

  function handleOnChange(val: string) {
    setInput(val);
  }

  function handleOnClear() {
    setInput("");
  }

  function handleSendMessage() {
    if (input.trim() === "" || input.length <= 0) {
      alert("Please fill required");
      return;
    }
    const data: SocketModel = {
      type: "chat",
      payload: {
        roomCode: roomCode,
        message: input,
      },
    };
    sendMessage(data);
    handleOnClear();
  }

  function handleLeaveRoom() {
    const data: SocketModel = {
      type: "leave",
      payload: {
        roomCode: roomCode,
      },
    };
    sendMessage(data);
    navigate("/", { replace: true });
  }
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-800 flex justify-between items-center p-2.5 rounded-xl text-gray-600 dark:text-gray-400 text-sm mb-4">
        <h5>Room Code: {roomCode}</h5>
        <div className="flex items-center gap-x-2.5 ">
          <h5>Users: {usersConnected}/5</h5>
          <IconButton
            icon={<LogOut />}
            onClick={handleLeaveRoom}
            arialLable={"Logout"}
          />
        </div>
      </div>
      <Container
        className="grow flex-1 overflow-y-auto"
        child={
          <div className="h-[500px] p-3.5">
            {chat.map((e,index) => (
              <Message key={index+Date.now()} message={e} />
            ))}
          </div>
        }
      />

      <div className="flex justify-between gap-x-2 my-3">
        <InputField
          value={input}
          placeholder="Type message ..."
          onChange={handleOnChange}
          onClear={handleOnClear}
          className="w-full"
          variant="solid"
        />
        <Button
          label="Send"
          onClick={handleSendMessage}
          className="w-full max-w-28"
        />
      </div>
    </>
  );
}

export default ChatContent;
