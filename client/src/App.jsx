import { useState } from 'react'
import './App.css'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className="app-shell">
      <div className="host-placeholder">
        <strong>Sua aplicação aqui</strong>
        <span>o Chat Channel é o painel docado à direita →</span>
      </div>
      <div className="chat-channel-dock">
        {
          chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
        }
      </div>
    </div>
  )
}

export default App
