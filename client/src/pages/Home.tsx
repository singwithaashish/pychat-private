import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import TextChatBox from "../components/chat/TextChatBox";

let socket: WebSocket | null = null;

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>(false);
  const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
  useEffect(() => {
    if (!localStorage.getItem("user-token")) {
      window.location.href = "/login";
    } else {
      setUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("user-token") || socketConnected) return;
    socket = new WebSocket(import.meta.env.VITE_SOCKET_URL as string);
    socket.onopen = () => {
      console.log("Connected to server");
      setSocketConnected(true);
    };
    socket.onmessage = (e) => {
      console.log(e.data);
    };
    socket.onclose = () => {
      console.log("Disconnected from server");
      setSocketConnected(false);
    };
  }, [socketConnected]);

  if (!userLoggedIn) return <div>loading...</div>;

  return (
    <div className="h-screen">
      <Header isOnline={socketConnected} />
      <main className="w-full h-[90%] bg-blue-100 grid grid-cols-3">
        {/* left text to text chat */}
        <TextChatBox socket={socket} />
        {/* Right TTS and STT box */}
        <div className=" col-span-1 h-full bg-gray-600 ">
          {/* list all chat Histories */}
          <div className="flex items-center gap-x-3 p-5 bg-gray-200 mb-2 mx-2 rounded ">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path d="M19 2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-4.414L12 18.586 9.414 16H5V4h14v12z" />
            </svg>
            <p className="text-xl font-bold">Chat History 1</p>
          </div>
        </div>
      </main>
    </div>
  );
}
