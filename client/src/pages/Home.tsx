import React, { useEffect } from 'react'
import Header from '../components/layout/Header'
import TextChatBox from '../components/chat/TextChatBox'

export default function Home() {
    useEffect(() => {
        if(!localStorage.getItem('token')) {
            window.location.href = '/login'
        }
    }
    , [])
  return (
    <div className="h-screen">
      <Header />
      <main className="w-full h-[90%] bg-gray-100 grid grid-cols-3">
        {/* left text to text chat */}
        <TextChatBox  />
        {/* Right TTS and STT box */}
        <div className=" col-span-1 h-full bg-gray-200">
          <div className="w-full h-[90%] bg-gray-300">{/* TTS */}</div>
          <div className="w-full h-[10%] bg-gray-600">{/* STT */}</div>
        </div>
      </main>
    </div>
  )
}
