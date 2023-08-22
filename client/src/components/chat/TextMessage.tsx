import { Message } from "../../typings";


export default function TextMessage({message}: {message: Message}) {
  return (
    <div
      className={
        `max-w-[80%] p-5 my-2 bg-gray-200 rounded-xl ` +
        (message.sender == "user" ? " ml-auto rounded-br-none" : " mr-auto rounded-bl-none")
      }
    >
      <p className="text-gray-600">{message.text}</p>
    </div>
  );
}
