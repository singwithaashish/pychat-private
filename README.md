**PyChat** is a simple Chatbot running on open source LLMs hosted on HuggingFace and accessed through [Google Colab](https://colab.research.google.com/drive/1BkL7zYVYtn0JPYKMPJ0tJmK-zMtINx0P?usp=sharing&authuser=1#scrollTo=T6oyrr4X0wc2). 

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
3. Add collab's wss link to `.env` file
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
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   └── manifest.json
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
![Screenshot from 2023-08-22 18-52-03](https://github.com/singwithaashish/pyChat/assets/52033403/fa246e56-628f-4879-9aee-87e1421946f4)
![Screenshot from 2023-08-22 19-36-52](https://github.com/singwithaashish/pyChat/assets/52033403/fa922be6-31b3-4ae0-b5a6-dff8a575a415)
![Screenshot from 2023-08-22 19-36-59](https://github.com/singwithaashish/pyChat/assets/52033403/65a39a69-61f7-40ae-86d8-3ea278e5c75c)

