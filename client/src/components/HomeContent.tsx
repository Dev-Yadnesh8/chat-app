import { MessageCircle, Clipboard } from "lucide-react";
import Button from "./Buttons/Button";
import InputField from "./InputField";
import { APPNAME, type SocketModel } from "../utils/constants";
import { generateRoomCode } from "../utils/helper";
import { useEffect, useState } from "react";
import IconButton from "./Buttons/IconButton";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../contexts/WebSocket";
import toast from "react-hot-toast";

function HomeContent() {
  const [roomCode, setRoomCode] = useState("");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const { status, sendMessage, lastMessage } = useWebSocket();

  function handleCreateRoom() {
    if (status === "open") {
      const newCode = generateRoomCode();
      setRoomCode(newCode);
      setInput(newCode);
      const data: SocketModel = {
        type: "create",
        payload: { roomCode: newCode },
      };
      sendMessage(data);
    } else {
      alert("WebSocket is not connected yet!");
    }
  }

  function handleOnChange(val: string) {
    setInput(val);
  }

  function handleOnClear() {
    setInput("");
  }


  useEffect(() => {
    if (!lastMessage) return;

    const { type, payload } = lastMessage;

    if (type === "error") {
      toast.error(payload.message);
    } else if (type === "info") {
      console.log("Received info message from server:", payload.message);
      localStorage.setItem("roomCode",input);
      localStorage.setItem("rejoined","0");
      navigate("chat");
    }
  }, [lastMessage, navigate]);

  function handleJoinRoom() {
    if (input.trim() === "" || input.length <= 0) {
      toast.error("Room code cannot be empty!!");
      return;
    }

    if (status === "open") {
      console.log("SENDING JOIN REQUEST----", input);
      const data: SocketModel = {
        type: "join",
        payload: { roomCode: input },
      };
      sendMessage(data);
    }
  }

  return (
    <>
      <div className="flex gap-x-1.5 items-center ">
        <MessageCircle />

        <h4 className="text-lg md:text-xl transition-all duration-500">
          <b>{APPNAME}</b> Unfiltered conversations, real-time
        </h4>
      </div>

      <p className="text-md text-gray-500 mb-4">
        Dil ki baat, live Charcha ke saath!
      </p>

      <Button
        label="Create a new room"
        onClick={handleCreateRoom}
        className="w-full mb-4"
      />

      {roomCode !== "" && (
        <div className="flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-xl bg-gray-200  dark:bg-gray-900 ">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Your Room Code
            </span>
            <h3 className="font-mono text-2xl font-semibold tracking-[0.4rem] text-gray-900 dark:text-white">
              {roomCode}
            </h3>
          </div>
          <IconButton
            icon={<Clipboard className="h-5 w-5" />}
            onClick={() => {
              navigator.clipboard.writeText(roomCode);
              alert("Room code copied!");
            }}
            arialLable="copy-room-code"
          />
        </div>
      )}

      <div className="flex justify-between gap-x-2 mb-2">
        <InputField
          value={input}
          onChange={handleOnChange}
          onClear={handleOnClear}
          className="w-full"
          variant="solid"
        />
        <Button
          label="Join Room"
          onClick={handleJoinRoom}
          className="w-full max-w-28"
        />
      </div>
    </>
  );
}

export default HomeContent;
