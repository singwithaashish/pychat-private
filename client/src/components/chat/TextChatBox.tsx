import { useEffect, useState } from "react";
import TextMessage from "./TextMessage";
import { Message } from "../../typings";

interface TextChatBoxProps {
  socket: WebSocket | null;
}

let socket: WebSocket | null = null;

export default function TextChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [streamResponse, setStreamResponse] = useState<string>("");
  // const [socketState, setSocketState] = useState<WebSocket | null>(socket);

  useEffect(() => {
    socket = new WebSocket(
      "wss://sends-classic-americas-witnesses.trycloudflare.com/api/v1/stream"
    );
    socket.onopen = () => {
      console.log("Connected to server");
    };
    socket.onmessage = (e) => {
      console.log(e.data);
    };
    socket.onclose = () => {
      console.log("Disconnected from server");
    };
  }, []);

  let history = {
    internal: [],
    visible: [],
  };

  const onMessageSend = () =>
    // history: string[] = [],
    // text: string = "Hello, how are you?"
    {
      try {
        const thisMessage = {
          prompt: text,
          max_new_tokens: 250,
          auto_max_new_tokens: false,
          history: history,
          mode: "instruct", // Valid options: 'chat', 'chat-instruct', 'instruct'
          character: "Example",
          instruction_template: "Vicuna-v1.1", // Will get autodetected if unset
          your_name: "You",
          // 'name1': 'name of user', # Optional
          // 'name2': 'name of character', # Optional
          // 'context': 'character context', # Optional
          // 'greeting': 'greeting', # Optional
          // 'name1_instruct': 'You', # Optional
          // 'name2_instruct': 'Assistant', # Optional
          // 'context_instruct': 'context_instruct', # Optional
          // 'turn_template': 'turn_template', # Optional
          regenerate: false,
          _continue: false,
          chat_instruct_command:
            'Continue the chat dialogue below. Write a single reply for the character "<|character|>".\n\n<|prompt|>',

          do_sample: true,
          preset: "None",
          top_p: 0.1,
          temperature: 0.7,
          epsilon_cutoff: 0,
          typical_p: 1,
          tfs: 1,
          eta_cutoff: 0,
          repetition_penalty: 1.18,
          top_a: 0,
          top_k: 40,
          repetition_penalty_range: 0,
          no_repeat_ngram_size: 0,
          min_length: 0,
          penalty_alpha: 0,
          num_beams: 1,
          early_stopping: false,
          length_penalty: 1,
          mirostat_tau: 5,
          mirostat_mode: 0,
          guidance_scale: 1,
          mirostat_eta: 0.1,

          negative_prompt: "",
          add_bos_token: true,
          seed: -1,
          ban_eos_token: false,
          truncation_length: 2048,
          stopping_strings: [],
          skip_special_tokens: true,
        };
        // console.log("thisMessage");
        if (!socket) return;
        socket.send(JSON.stringify(thisMessage));
        // console.log("thisMessageSent");
      } catch (err) {
        console.log(err);
      }
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(socket);
    if (!socket) return;
    
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
    socket.onmessage = (e) => {
      const res = JSON.parse(e.data);

      if (res.event === "text_stream") {
       
        history.internal.push(res.text as never);
        lastMessage.text += res.text;
        setMessages([...messages, message, lastMessage]);
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
      </div>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="w-full h-[10vh] p-1 grid grid-cols-12"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          placeholder="Enter your text"
          className="bg-white px-5 shadow rounded-lg col-span-10"
        />
        <button type="submit" className="bg-gray-100 rounded-lg col-span-2">
          Send
        </button>
      </form>
    </div>
  );
}
