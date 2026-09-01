import { useState } from 'react'
import './App.css'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  return (
    <div className="app-shell app-shell--launcher">
      <div className="host-placeholder">
        <strong>Sua aplicação aqui</strong>
        <span>o Chat Channel abre só quando o usuário clicar no botão →</span>
      </div>

      {panelOpen && (
        <div className="chat-channel-launcher-panel">
          {
            chatVisibility
              ? <Chat socket={socket} onClose={() => setPanelOpen(false)} />
              : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} onClose={() => setPanelOpen(false)} />
          }
        </div>
      )}

      {!panelOpen && (
        <button
          className="chat-channel-launcher"
          onClick={() => setPanelOpen(true)}
        >
          <span className="chat-channel-launcher__dot" />
          Falar no chat
        </button>
      )}
    </div>
  )
}

export default App
