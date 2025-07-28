import { useEffect, useState } from "react";


function App() {
  const [messages,setMessage] = useState<string[]>([]);
  interface ReqModel {
  type: "chat" | "join";
  payload: {
    message?: string;
    roomCode:string;
  };
}
 function doConnection(){
   const ws = new WebSocket("ws://localhost:9000");

  ws.onmessage = (event)=>{
    console.log(event.data);
    setMessage((prev) =>( [...prev,event.data]));
    
  };

  ws.onopen = (event)=>{
    console.log(event);
    const data:ReqModel = {
      type:"join",
      payload:{
        roomCode:"abc124"

      }
    } 
    ws.send(JSON.stringify(data))
  }
 }

 useEffect(()=>{doConnection()},[]);
  return (
    <div
      className="h-screen w-full font-display bg-gray-100 dark:bg-gray-950  text-black
     dark:text-gray-50"
    >
      {messages.map((message)=><h3>{message}</h3>)}
    </div>
  );
}
export default App;
