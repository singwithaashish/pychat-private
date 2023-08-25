import { useState } from "react";
import { Message } from "../../typings";

export default function TextMessage({ message }: { message: Message }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const convertTTS = async (text: string) => {
    setIsPlaying(true);
    const audio = new Audio();

    const req = await fetch("http://127.0.0.1:8000/api/text-to-speech", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    // req.body is a readable stream
    const res = await req.blob();
    audio.src = URL.createObjectURL(res);
    audio.play();
    audio.onended = () => {
      setIsPlaying(false);
    };
  };
  return (
    <div
      className={
        `max-w-[80%] p-5 my-2 bg-gray-200 rounded-xl relative ` +
        (message.sender == "user"
          ? " ml-auto rounded-br-none"
          : " mr-auto rounded-bl-none")
      }
    >
      <p className="text-gray-600  whitespace-pre-line">{message.text}</p>
      <div
        className={"flex justify-end cursor-pointer hover:scale-110 transform duration-300 absolute -bottom-2 -right-2 rounded-full bg-gray-300 p-2" + (isPlaying ? " animate-pulse" : "")}
        onClick={() => convertTTS(message.text)}
      >
        <svg
          fill="none"
          viewBox="0 0 15 15"
          height="1em"
          width="1em"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 1.5a.5.5 0 00-.8-.4L3.333 4H1.5A1.5 1.5 0 000 5.5v4A1.5 1.5 0 001.5 11h1.833L7.2 13.9a.5.5 0 00.8-.4v-12zM3.8 4.9L7 2.5v10l-3.2-2.4a.5.5 0 00-.3-.1h-2a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5h2a.5.5 0 00.3-.1zm7.033-.94a.4.4 0 00-.666.443 5.607 5.607 0 010 6.194.4.4 0 10.666.444 6.407 6.407 0 000-7.082z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
