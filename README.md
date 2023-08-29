**PyChat** is a simple Chatbot running on open-source LLMs accessed through [Google Colab](https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing&authuser=1#scrollTo=T6oyrr4X0wc2). 

Demo Video URL: https://youtu.be/ruk9odCxLr0

## Table of Contents
- [Installation](#installation)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [Future Work](#future-work)
- [Screenshots](#screenshots)

## Installation
1. Clone the repo
   ```git clone```
2. Install requirements
    ```cd client && npm install```
3. Run the app
    ```npm run dev```
4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
5. navigate to server `cd server` in another terminal
6. add websocket url to `app.py` as `URI = <websocket url>`
6. Run the server `python3 app.py`

## Technologies
- React
- TailwindCSS
- TypeScript
- Google Colab
- Python
- FastAPI
- Websockets

## Folder Structure
```
├── client
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── components
│   │   │   ├── chat
│   │   │   │   ├── TextChatBox.tsx
│   │   │   │   └── TextMessage.tsx
│   │   │   └── layout
│   │   │       ├── Header.tsx
│   │   │       └── LabeledInput.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── app
│   │   │   ├── store.ts
│   │   │   └── historySlice.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── typings.d.ts
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── index.html
│   ├── tsconfig.json
│   └── README.md
├── server
│   └── app.py
├── APIExampleChatStream.py
├── APIExampleStream.py
├── README.md
└── SampleAPI_URLS.png
```

## Future Work
- [x] Add Text to Speech
- [ ] Add Speech to Text

## Screenshots
![Screenshot from 2023-08-26 10-54-42](https://github.com/singwithaashish/pychat-private/assets/52033403/4c407d7f-9602-4ae3-aa8d-391bea1b41af)

![Screenshot from 2023-08-26 10-50-39](https://github.com/singwithaashish/pychat-private/assets/52033403/81e9d3e1-0697-4560-92fd-e6478f483f23)
![Screenshot from 2023-08-26 10-50-21](https://github.com/singwithaashish/pychat-private/assets/52033403/3d8e910b-a64b-41e2-b04d-09a4b625d211)


![Screenshot from 2023-08-24 01-07-15](https://github.com/singwithaashish/pychat-private/assets/52033403/bfa8865b-68d3-4171-88d2-b79a669951ff)
![Screenshot from 2023-08-24 01-07-18](https://github.com/singwithaashish/pychat-private/assets/52033403/db5ba4f2-3e65-4947-afdf-38f0bb9d4103)



