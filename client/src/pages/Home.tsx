import React, { useEffect } from "react";
import Header from "../components/layout/Header";
import TextChatBox from "../components/chat/TextChatBox";

let socket: WebSocket | null = null;

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>(false);
  const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
  const [selectedChat, setSelectedChat] = React.useState<number>(0);

  const history = ["How to launch a rocket", "CIA and Barbie", "Three Aliens"]; // just a list of strings for mockup
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
          {history.map((chat, index) => (
            <div
              className={
                "flex items-center gap-x-3 p-5  mb-2 mx-2 duration-300 hover:bg-gray-50 cursor-pointer rounded  " +
                (index === selectedChat
                  ? "rounded-l-none bg-gray-100 ml-0"
                  : " bg-gray-200")
              }
              key={index}
              onClick={() => setSelectedChat(index)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-600"
              >
                <path d="M19 2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-4.414L12 18.586 9.414 16H5V4h14v12z" />
              </svg>
              <p className="text-xl font-medium">{chat}</p>
            </div>
          ))}

          <div className="flex items-center gap-x-3 p-5 bg-gray-200 mb-2 mx-2 rounded ">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <defs>
                <style />
              </defs>
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
              <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
            </svg>
            <p className="text-xl font-bold">New Chat</p>
          </div>
        </div>
      </main>
    </div>
  );
}
