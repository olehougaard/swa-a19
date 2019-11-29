const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 9090, path: '/chat' })

const clients = {}

wss.on('connection', (ws, req) => {
    ws.on('message', message => {
        const { command, ...params } = JSON.parse(message)
        switch(command) {
            case 'subscribe':
                const { nick } = params
                ws.nick = nick
                clients[nick] = ws
                break;
            case 'unsubscribe':
                delete clients[ws.nick]
                delete ws.nick
                break;
            case 'send':
                const { to, msg } = params
                const client = clients[to]
                if (client && client.readyState === WebSocket.OPEN) client.send(msg)
                break;
            default:
                console.error(`Incorrect message: '${message}' from ${req.connection.remoteAddress} (${req.connection.remoteFamily})`)
        }
    })
    ws.on('close', () => {
        delete clients[ws.nick]
        delete ws.nick
    })
})
