import { ChatContent, Container } from "../components";

function Chat() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-2xl h-full">
        <Container child={<ChatContent />} className="p-4 md:p-8" />
      </div>
    </div>
  );
}

export default Chat;
