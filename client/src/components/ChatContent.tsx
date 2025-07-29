import { useState } from "react";
import Button from "./Buttons/Button";
import Container from "./Container";
import InputField from "./InputField";

function ChatContent() {
  const [input, setInput] = useState("");

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
  }
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-800 flex justify-between items-center p-2.5 rounded-xl text-gray-600 dark:text-gray-400 text-sm mb-4">
        <h5>Room Code: 123456</h5>
        <h5>Users 2:/5</h5>
      </div>
      <Container
        className="grow flex-1 overflow-y-auto"
        child={
          <div className="h-[500px]"> {/* Chat messages will go here */}</div>
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
