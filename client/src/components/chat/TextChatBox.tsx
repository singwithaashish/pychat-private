import { useEffect, useRef, useState } from "react";
import TextMessage from "./TextMessage";
import { Character, History, Message } from "../../typings";
import { useDispatch, useSelector } from "react-redux";
import { addToCurrentHistory, setCharacter } from "../../app/historySlice";
import { RootState } from "../../app/store";
import { characters } from "../../assets/characters";

interface TextChatBoxProps {
  socket: WebSocket | null;
  history: History;
}

// let socket: WebSocket | null = null;
// let history = {
//   internal: [],
//   // visible: [],
// } as any;

export default function TextChatBox({ socket, history }: TextChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useDispatch();
  const currentHistoryIndex = useSelector(
    (state: RootState) => state.history
  ).currentHistoryIndex;

 

  const onMessageSend = () => {
    console.log(history);
    try {
      const thisMessage = {
        message: `### You are ${history.character?.name} and Your Personality is: ${history.character?.background}
        ###JSON of Previous conversation: ${JSON.stringify(
          history.internal
        )} ### User message: ${text} ### Response:`,
      };
      if (!socket) return;
      socket.send(JSON.stringify(thisMessage));
      // console.log("thisMessageSent");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // map all histories into messages
    // console.log("currentHistoryIndex", currentHistoryIndex);
    const messages: Message[] = [];
    if (history.internal.length === 0) {
      setMessages([]);
      return;
    }
    history.internal.forEach((message) => {
      messages.push({
        id: messages.length,
        text: message ? message[0] : "",
        createdAt: new Date(),
        sender: "user",
      });
      messages.push({
        id: messages.length,
        text: message ? message[1] : "",
        createdAt: new Date(),
        sender: "bot",
      });
    });
    setMessages(messages);
  }, [currentHistoryIndex]);

  useEffect(() => {
    // This will run every time the `chat` state changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ! 25 message limit
    if (messages.length >= 25) {
      alert("You have reached the message limit");
      return;
    }
    console.log("text", text);
    if (!socket) return;
    console.log("text", text);

    // history.internal.push([text, ""]);
    // history.visible.push([text, ""]);

    const message: Message = {
      id: messages.length,
      text,
      createdAt: new Date(),
      sender: "user",
    };

    // machine responds
    onMessageSend();
    const lastMessage: Message = {
      text: "",
      id: new Date().getTime(),
      createdAt: new Date(),
      sender: "bot",
    };
    console.log("lastMessage", lastMessage);
    socket.onmessage = (e) => {
      const res = JSON.parse(e.data);

      // console.log(res);

      if (res.event === "text_stream") {
        lastMessage.text += res.text;
        setMessages([...messages, message, lastMessage]);
      } else if (res.event === "stream_end") {
        // setMessages([...messages, message, lastMessage]);
        // history.internal[history.internal.length - 1][1] = lastMessage.text;
        dispatch(addToCurrentHistory([text, lastMessage.text]));
        // history.visible[history.internal.length - 1][1] = lastMessage.text;
      }
    };

    setText("");
  };
  return (
    <div className=" col-span-2 h-full bg-gray-100">
      <div className="w-full h-[80vh] flex flex-col p-4 overflow-y-scroll">
        {messages.map((message) => (
          <TextMessage key={message.id} message={message} />
        ))}
        {messages.length === 0 && (
          <>
            <p className="text-center text-gray-400 font-bold">
              Please select a character you'd wanna chat with
            </p>
            <div className="flex gap-x-5">
              {characters.map((character, i) => (
                <div
                  className={
                    "flex flex-col gap-y-2 " +
                    (history.character?.id === character.id
                      ? " border-2 border-red bg-red-100"
                      : "")
                  }
                  key={i}
                  onClick={() => {
                    dispatch(setCharacter(character));
                  }}
                >
                  <img
                    src={character.image}
                    alt=""
                    className="w-20 h-20 rounded-full"
                  />
                  <p className="text-center text-gray-400 font-bold">
                    {character.name}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="w-full h-[10vh] p-1 grid grid-cols-12 gap-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Enter your text"
          className="bg-white px-5 shadow rounded-lg col-span-10"
        />
        {/* <input
          type="file"
          className="col-span-1"
          accept="audio/*"
          // onChange={(e) => setFile(e.target.files![0])}
        /> */}
        <button
          type="submit"
          className={
            " rounded-lg col-span-2 " + (text ? "bg-green-400" : "bg-gray-200")
          }
        >
          Send
        </button>
      </form>
    </div>
  );
}
