import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket, onClose}) {

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  const getEnterKey = (e) => {
    if(e.key === 'Enter')
      handleSubmit()
  }

  return (
    <div className={style['join-container']}>
      {onClose && (
        <div className={style['join-header']}>
          <span className={style['join-header__title']}>Chat Channel</span>
          <button className={style['join-header__close']} onClick={onClose} aria-label="Fechar chat">×</button>
        </div>
      )}
      <div className={style['join-body']}>
        <h2>Entrar no canal</h2>
        <Input fullWidth inputRef={usernameRef} placeholder='Nome de usuário' onKeyDown={(e)=>getEnterKey(e)} />
        <Button
          sx={{mt:1, bgcolor: '#111827', '&:hover': {bgcolor: '#1f2937'}}}
          onClick={()=>handleSubmit()}
          variant="contained"
        >
          Entrar
        </Button>
      </div>
    </div>
  )
}
