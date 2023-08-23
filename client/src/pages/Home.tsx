import React, { useEffect } from 'react'
import Header from '../components/layout/Header'
import TextChatBox from '../components/chat/TextChatBox'

export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = React.useState<boolean>(false)
    useEffect(() => {
        if(!localStorage.getItem('user-token')) {
            window.location.href = '/login'
        }else{
            setUserLoggedIn(true)
        }
    }
    , [])

    const logOut = () => {
        localStorage.removeItem('user-token')
        window.location.href = '/login'
    }

    if(!userLoggedIn) return <div>loading...</div>

  return (
    <div className="h-screen">
      <Header />
      <main className="w-full h-[90%] bg-blue-100 grid grid-cols-3">
        {/* left text to text chat */}
        <TextChatBox  />
        {/* Right TTS and STT box */}
        <div className=" col-span-1 h-full bg-blue-200">
          <div className="w-full h-[90%] bg-blue-300 ">
            <p className='text-center text-white font-bold'>
              Welcome User, Feel free to use the chat box on the left to talk to
              the bot.
            </p>
          </div>
          <div className="w-full h-[10%] bg-red-600 cursor-pointer text-center flex justify-center items-center text-white" onClick={logOut}>
            Log Out
          </div>
        </div>
      </main>
    </div>
  )
}
