# Chat Channel

Canal de comunicação em tempo real reutilizável, baseado em Socket.IO. A ideia é servir como peça de comunicação ao vivo para ser acoplada dentro de outra aplicação — um dashboard, um painel interno, um sistema de suporte — e não como um app de chat pronto para uso final.

Hoje é uma implementação de referência: client e servidor rodam separados, broadcast é global (sem salas) e não há persistência nem autenticação. É a base do mecanismo de tempo real, não o produto acabado.

## Proposta

O objetivo não é entregar "um chat", e sim um módulo de comunicação em tempo real que possa ser integrado em sistemas maiores como um canal a mais dentro da aplicação — por exemplo, um chat de suporte embutido, notificações ao vivo entre usuários de um mesmo painel, ou qualquer fluxo que precise de troca de mensagens instantânea sem dar polling.

A versão atual é simples de propósito: valida o mecanismo (conexão, broadcast, entrega em tempo real) antes de evoluir para algo com isolamento por canal/conversa, autenticação e persistência — os passos naturais para virar de fato um módulo plugável.

## Stack

**Client** (`chat-channel/client`)
- React 18 + Vite
- Material UI (`@mui/material`, `@emotion`)
- `socket.io-client`

**Server** (`chat-channel/server`)
- Node.js + Express
- Socket.IO v4

## Como funciona

O usuário escolhe um nome de usuário na tela inicial e entra no chat. A partir daí, toda mensagem enviada é transmitida via Socket.IO para **todos os clientes conectados** — é um broadcast global (`io.emit`), não existem salas, canais ou conversas privadas. Todo mundo que estiver conectado ao servidor vê todas as mensagens de todo mundo.

Não há persistência: as mensagens vivem só em memória durante a sessão. Ao dar refresh na página ou desconectar, o histórico se perde.

## Instalação e execução

O servidor tem CORS fixo liberando apenas a origin `http://127.0.0.1:5502`. Por isso o client **precisa** rodar exatamente nesse host e porta — a porta padrão do Vite (5173) não vai funcionar, a conexão com o servidor vai ser bloqueada.

### 1. Servidor

```bash
cd chat-channel/server
npm install
node index.js
```

Ou, com reload automático (nodemon):

```bash
npm run dev
```

O servidor sobe em `http://localhost:3001`.

### 2. Client

Em outro terminal:

```bash
cd chat-channel/client
npm install
npx vite --host 127.0.0.1 --port 5502
```

Acesse `http://127.0.0.1:5502` no navegador.

## Limitações conhecidas

- **Broadcast único, sem canais/rooms**: toda mensagem vai para todos os conectados via `io.emit`. Não há isolamento por conversa. Para funcionar como módulo plugável de verdade (múltiplos chats/contextos dentro da mesma aplicação hospedeira), o próximo passo natural é migrar para Socket.IO rooms, uma por canal/conversa.
- **Sem persistência**: mensagens existem só em memória, no servidor rodando. Refresh ou reinício = histórico perdido.
- **Sem autenticação**: o "nome de usuário" é só um texto livre, sem verificação nenhuma. Dois usuários podem entrar com o mesmo nome.
- **CORS hardcoded**: a origin liberada (`http://127.0.0.1:5502`) está fixa em `server/index.js`, não é configurável via variável de ambiente. Se precisar rodar o client em outro host/porta, é necessário editar o código do servidor.
