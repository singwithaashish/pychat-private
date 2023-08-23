**PyChat** is a simple Chatbot running on open-source LLMs accessed through [Google Colab](https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing&authuser=1#scrollTo=T6oyrr4X0wc2). 

Demo Video URL: https://youtu.be/2ZYo9fmF47s

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
3. Add collab's wss link to `.env` file as `VITE_SOCKET_URL=<your wss URL>`
4. Run the app
    ```npm run dev```
5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Technologies
- React
- TailwindCSS
- TypeScript
- Google Colab

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
│   │   │   ├── layout
│   │   │   │   ├── Header.tsx
│   │   │   │   └── LabeledInput.tsx
│   │   │   └── Pages
│   │   │       ├── Home.tsx
│   │   │       ├── Login.tsx
│   │   │       └── Register.tsx
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
├── APIExampleChatStream.py
├── APIExampleStream.py
├── README.md
└── SampleAPI_URLS.png
```

## Future Work
- [ ] Add whisper Text to Speech
- [ ] Add Speech to Text

## Screenshots
![Screenshot from 2023-08-24 01-06-21](https://github.com/singwithaashish/pychat-private/assets/52033403/01902e5f-6b25-4837-978d-7a9a73a5933e)
![Screenshot from 2023-08-24 01-07-15](https://github.com/singwithaashish/pychat-private/assets/52033403/bfa8865b-68d3-4171-88d2-b79a669951ff)
![Screenshot from 2023-08-24 01-07-18](https://github.com/singwithaashish/pychat-private/assets/52033403/db5ba4f2-3e65-4947-afdf-38f0bb9d4103)



