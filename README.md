**PyChat** is a simple Chatbot running on open source LLMs hosted on HuggingFace and accessed through Google Colab. 

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
- [ ] Add Wisper Text to Speech
- [ ] Add Speech to Text

## Screenshots

