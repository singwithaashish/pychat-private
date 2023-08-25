import json
import sys

# Import FastAPI and WebSocket
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware


try:
    import websockets
except ImportError:
    print("Websockets package not found. Make sure it's installed.")


URI = "wss://explosion-housing-reynolds-iii.trycloudflare.com/api/v1/stream"

app = FastAPI()


async def run(context):
    request = {
          "prompt": context,
        #   "history": history,
          "max_new_tokens": 250,
          "auto_max_new_tokens": False,
          "mode": "chat-instruct", # Valid options: 'chat', 'chat-instruct', 'instruct'
          "character": "Example",
          "instruction_template": "Vicuna-v1.1", # Will get autodetected if unset
          "your_name": "User",
          "#" 'name1': 'name of user', # Optional
          "#" 'name2': 'name of character', # Optional
          "#" 'context': 'character context', # Optional
          "#" 'greeting': 'greeting', # Optional
          "#" 'name1_instruct': 'You', # Optional
          "#" 'name2_instruct': 'Assistant', # Optional
          "#" 'context_instruct': 'context_instruct', # Optional
          "turn_template": "turn_template", # Optional
          "regenerate": False,
          "_continue": False,
          "chat_instruct_command":
            'Write a single reply to the user\'s query below. Only give onc answer "<|character|>".\n\n<|prompt|>',

          "do_sample": True,
          "preset": "None",
          "top_p": 0.1,
          "temperature": 0.7,
          "epsilon_cutoff": 0,
          "typical_p": 1,
          "tfs": 1,
          "eta_cutoff": 0,
          "repetition_penalty": 1.18,
          "top_a": 0,
          "top_k": 40,
          "repetition_penalty_range": 0,
          "no_repeat_ngram_size": 0,
          "min_length": 0,
          "penalty_alpha": 0,
          "num_beams": 1,
          "early_stopping": False,
          "length_penalty": 1,
          "mirostat_tau": 5,
          "mirostat_mode": 0,
          "guidance_scale": 1,
          "mirostat_eta": 0.1,

          "negative_prompt": "",
          # add_bos_token: true,
          "seed": -1,
          "ban_eos_token": False,
          "truncation_length": 2048,
          "stopping_strings": [],
          "skip_special_tokens": True,
    }

    async with websockets.connect(URI, ping_interval=None) as websocket:
        await websocket.send(json.dumps(request))

        yield context  # Remove this if you just want to see the reply

        while True:
            incoming_data = await websocket.recv()
            incoming_data = json.loads(incoming_data)
            # yield incoming_data

            match incoming_data["event"]:
                case "text_stream":
                    yield incoming_data
                case "stream_end":
                    # when stream ends, yield and also return
                    yield incoming_data
                    return



@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        prompt = data["message"]
        # print(prompt)
        async for response in run(prompt):
            # print(response)
            sys.stdout.flush() # If we don't flush, we won't see tokens in realtime.
            await websocket.send_json(response)






