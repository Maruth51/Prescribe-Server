import * as express from 'express';
import * as http from 'http'
import * as WebSocket from 'ws'
import {Login, Signup} from './user'
import * as cors from 'cors';

const app= express()

const server = http.createServer(app)

const wss = new WebSocket.Server({server})

type msgType = "ORDER" | "RESET"

interface items {
    pizza: boolean,
    coke:boolean
}

interface message {
    type: msgType,
    data?: string

}

let orderAvailStatus :items ={
    pizza: true,
    coke : true,
}

wss.on('connection',(ws: WebSocket)=>{
    ws.on('message',(msg: string)=>{
        const data = JSON.parse(msg)
        console.log(data)
        orderAvailStatus["pizza"]=data.hasOwnProperty('pizza') ? data.pizza : orderAvailStatus.pizza
        orderAvailStatus["coke"]= data.hasOwnProperty('coke') ? data.coke : orderAvailStatus.coke
        console.log(orderAvailStatus)
        wss.clients.forEach((client)=>{
            if(client.readyState === ws.OPEN ){
                console.log("client")
                client.send(JSON.stringify(orderAvailStatus))
            }
        })
    })


    ws.send(JSON.stringify(orderAvailStatus))
})

const broadCast =(socket : WebSocket)=>{
    wss.clients.forEach((client)=>{
        if(client.readyState ===socket.OPEN){
            client.send(JSON.stringify(orderAvailStatus))
        }
    })

}
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('from HTTP Protocal')
})

app.post('/Login',Login)
app.post('/Signup',Signup)

server.listen(process.env.PORT || 443, () => {
    console.log(`Server started on port ${server.address()} :)`);
})
