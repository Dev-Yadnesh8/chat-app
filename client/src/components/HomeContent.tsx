// components/HomeContent.tsx

import { MessageCircle } from "lucide-react";
import Button from "./Buttons/Button";
import InputField from "./InputField";
import { APPNAME } from "../utils/constants";

function HomeContent() {
  return (
    <div className="max-w-2xl">
      <div className="flex gap-x-1.5 items-center ">
        <MessageCircle />

        <h4>
          <b className="text-xl">{APPNAME}</b> Unfiltered conversations,
          real-time
        </h4>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Dil ki baat, live Charcha ke saath!
      </p>

      <Button
        label="Create a new room"
        onClick={() => {}}
        className="w-full mb-4"
      />

      <div className="flex justify-between gap-x-2 mb-2">
        <InputField
          value=""
          onChange={() => {}}
          onClear={() => {}}
          className="w-full"
          variant="solid"
        />
        <Button
          label="Join Room"
          onClick={() => {}}
          className="w-full max-w-28"
        />
      </div>
    </div>
  );
}

export default HomeContent;
