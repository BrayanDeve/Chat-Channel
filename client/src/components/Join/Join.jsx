import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'

export default function Join({setChatVisibility, setSocket}) {

  const usernameRef = useRef()

  const handleSubmit = async () => {
    const username = usernameRef.current.value
    if(!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('set_username', username)
    setSocket(socket)
    setChatVisibility(true)
  }

  return (
    <div className={style['join-container']}>
      <h2>Entrar no canal</h2>
      <Input fullWidth inputRef={usernameRef} placeholder='Nome de usuário' />
      <Button
        sx={{mt:1, bgcolor: '#6366f1', '&:hover': {bgcolor: '#4f46e5'}}}
        onClick={()=>handleSubmit()}
        variant="contained"
      >
        Entrar
      </Button>
    </div>
  )
}
