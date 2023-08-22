import Header from "./components/layout/Header";
import TextChatBox from "./components/chat/TextChatBox";
import { useEffect } from "react";

let socket: WebSocket | null = null;

function App() {
  // useEffect(() => {
  //   socket = new WebSocket("wss://univ-jones-pupils-hats.trycloudflare.com/api/v1/stream");
  //   socket.onopen = () => {
  //     console.log("Connected to server");
  //   };
  //   socket.onmessage = (e) => {
  //     console.log(e.data);
  //   };
  //   socket.onclose = () => {
  //     console.log("Disconnected from server");
  //   };
  // }, []);

  return (
    <div className="h-screen">
      <Header />
      <main className="w-full h-[90%] bg-gray-100 grid grid-cols-3">
        {/* left text to text chat */}
        <TextChatBox  />
        {/* Right TTS and STT box */}
        <div className=" col-span-1 h-full bg-gray-200">
          <div className="w-full h-[90%] bg-gray-300">{/* TTS */}</div>
          <div className="w-full h-[10%] bg-gray-600">{/* STT */}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
