import { MessageCircle, Clipboard } from "lucide-react";
import Button from "./Buttons/Button";
import InputField from "./InputField";
import { APPNAME } from "../utils/constants";
import { generateRoomCode } from "../utils/helper";
import React, { useState } from "react";
import IconButton from "./Buttons/IconButton";

function HomeContent() {
  const [roomCode, setRoomCode] = useState("");
  const [input, setInput] = useState("");

  function handleCreateRoom() {
    setRoomCode(generateRoomCode());
  }

  function handleOnChange(val:string) {
    setInput(val);
  }

  function handleOnClear() {
    setInput("");
  }

  return (
    <>
      <div className="flex gap-x-1.5 items-center ">
        <MessageCircle />

        <h4 className="text-xl">
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
            <h3 className="font-mono text-2xl font-semibold tracking-widest text-gray-900 dark:text-white">
              {roomCode}
            </h3>
          </div>
          <IconButton
            icon={<Clipboard />}
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
          onClick={() => {}}
          className="w-full max-w-28"
        />
      </div>
    </>
  );
}

export default HomeContent;
