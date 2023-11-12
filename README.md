# Text to Speech Conversion App

This is a text to speech converter app. This app was developed using AI tools, primarily as a learning exercise to explore the integration of AI capabilities in the app development process. 

## Description
This app allows users to convert text to speech through a web interface. Users input a prompt in the frontend, triggering a backend process that generates audio. The generated audio can be played back, and previous conversions are stored for reference. The app works both on the web as a desktop app. 


## Role of AI tools
With the help of AI tools, particularly ChatGPT, I quickly built the frontend of the app using react-bootstrap for styling. ChatGPT generated the App component following my description of the main features and logic. With this aid, the entire development of the app took me less than 5 hours. 

I also used chatGPT as aid in the implementation of Electron, which I had never done before. 

Finally, I used chatGPT also in the creation of this readMe.dm. It took me about 30 minutes to complete this. 

Here you can find chats that were used in the development process:
- Create app https://chat.openai.com/share/cf2e2a5d-471f-4cbb-a803-39600fbcd9f1
- Style app https://chat.openai.com/share/e497e9d5-7f0f-4a25-a087-1c7bba2c4084
- Implement Electron: https://chat.openai.com/share/f06603ca-b070-4ec3-ba26-7f501ee3dada
- Create readMe https://chat.openai.com/share/bf2d2f97-a121-4ad0-a7c8-878432430495

## Prerequisites
- Node.js installed on your machine
- Text editor (e.g., VSCode)

## Getting Started

### Backend Service
- Navigate to the `backend` directory.
- Run `npm install` to install dependencies.
- Create a `.env` file in the `backend` directory with the following variables:

```makefile
PORT=1234
PUBLIC_PATH=./public
FILE_EXTENSION=wav
EMBED=https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin
```
Run `npm start` to start the backend server.

### Frontend Service
- Navigate to the `frontend` directory.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the frontend development server.

### Electron App (optional)
- Navigate to the backend directory.
- Run npm run electron to launch the Electron app.

## Running the Services
- Backend: http://localhost:1234
- Frontend: http://localhost:3000
- Electron App: Desktop application using Electron

## API Usage
1. Generate Audio
- Endpoint: /api/generate
- Method: POST
- Payload Example:
```json
{
  "phrase": "Hello, world!"
}
```
2. Retrieve Audio Files
- Endpoint: /api/recuperate
- Method: GET
- Response Example:
```json
{
  "audioFiles": [
    "audio-1611f220-5745-486d-92b0-7866a758f684.wav",
    "audio-325cbf2b-7454-41f7-9b1d-2ab37ef2e973.wav"
  ]
}
```

## @xenova/transformers Module
The @xenova/transformers module is utilized for text-to-speech transformation. It enables the application to convert textual prompts into audio files through the specified transformer model.

## Xenova/speecht5_tts
The Xenova/speecht5_tts model is employed for the actual text-to-speech conversion. This model is part of the transformers library and is capable of generating high-quality synthetic speech based on input prompts.

## Electron Implementation
The Electron framework is used to create a desktop application for the Text to Speech Conversion App. Electron allows the application to run as a standalone desktop application, providing a seamless user experience across different platforms.