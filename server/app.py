import json
import sys
import io

# Import FastAPI and WebSocket
from fastapi import FastAPI, WebSocket, Request, Response, File, UploadFile, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import openai
from gtts import gTTS
import pymongo
# bcrypt and jwt
import bcrypt
import jwt



try:
    import websockets
except ImportError:
    print("Websockets package not found. Make sure it's installed.")




URI = "wss://lost-sector-take-slowly.trycloudflare.com/api/v1/stream"

# connect to mongodb
client = pymongo.MongoClient("mongodb+srv://singwithaashish:root0000@cluster0.ovptt.mongodb.net/fiverr_travel_app?retryWrites=true&w=majority")
db = client.fiverr_travel_app
print(db)
print(client.list_database_names())
# print(client.list_database_names())

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


async def run(context):
    request = {
        "prompt": context,
        #   "history": history,
        "max_new_tokens": 250,
        "auto_max_new_tokens": False,
        "mode": "chat-instruct",  # Valid options: 'chat', 'chat-instruct', 'instruct'
        "character": "Example",
        "instruction_template": "Vicuna-v1.1",  # Will get autodetected if unset
        "your_name": "User",
        # "name1": "name of user",  # Optional
        # "name2": "name of character",  # Optional
        # "context": "character context",  # Optional
        # "greeting": "greeting",  # Optional
        # "name1_instruct": "You",  # Optional
        # "name2_instruct": "Assistant",  # Optional
        # "context_instruct": "context_instruct",  # Optional
        "turn_template": "turn_template",  # Optional
        "regenerate": False,
        "_continue": False,
        "chat_instruct_command": 'Write a single reply to the user\'s query below. Only give onc answer "<|character|>".\n\n<|prompt|>',
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
    # authenticate user here
    token = websocket.query_params.get("token")
    print(token)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    if not isTokenValid(token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    print("User authenticated")

    await websocket.accept()
    while True:
        data = await websocket.receive_json()
        prompt = data["message"]
        # print(prompt)
        async for response in run(prompt):
            # print(response)
            sys.stdout.flush()  # If we don't flush, we won't see tokens in realtime.
            await websocket.send_json(response)


# get text and send audio using whisper api
@app.post("/api/text-to-speech")
async def text_to_speech(request: Request):
    language = "en"
    resp = await request.json()
    text = resp["text"]
    tts = gTTS(text=text, lang=language, slow=False)

   # Create an in-memory file-like object to store the audio data
    audio_stream = io.BytesIO()
    tts.write_to_fp(audio_stream)
    audio_stream.seek(0)  # Move the stream pointer to the beginning
    
    return StreamingResponse(audio_stream, media_type="audio/mpeg")





# register user on mongodb
@app.post("/api/register")
async def register(request: Request):
    try:
        resp = await request.json()
        print(resp)
        email = resp["email"]
        password = resp["password"]
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        print(hashed_password)
        user = db.users.find_one({"email": email})
        if user:
            return {"error": "User already exists"}
        else:
            db.users.insert_one(
                {
                    "email": email,
                    "password": hashed_password,
                }
            )
            encoded_jwt = jwt.encode(payload={"email": email}, key="secret", algorithm="HS256")
            return {"token": encoded_jwt}
    except Exception as e:
        print(e)
        return {"error": "Something went wrong"}
    

# login user
@app.post("/api/login")
async def login(request: Request):
    try:
        resp = await request.json()
        print(resp)
        email = resp["email"]
        password = resp["password"]
        user = db.users.find_one({"email": email})
        if user:
            if bcrypt.checkpw(password.encode("utf-8"), user["password"]):
                encoded_jwt = jwt.encode(payload={"email": email}, key="secret", algorithm="HS256")
                return {"token": encoded_jwt}
            else:
                return {"error": "Invalid password"}
        else:
            return {"error": "User does not exist"}
    except Exception as e:
        print(e)
        return {"error": f"Something went wrong {e}"}
    

# validate token
def isTokenValid(token):
    try:
        decoded_jwt = jwt.decode(token, key="secret", algorithms=["HS256"])
        print(decoded_jwt)
        user = db.users.find_one({"email": decoded_jwt["email"]})
        if user:
            return True
        else:
            return False
    except Exception as e:
        print(e)
        return False


    