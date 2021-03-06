import React, {useState,useEffect} from'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './Chat.css'

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import OnlineMember from '../OnlineMember/OnlineMember'


let socket

const Chat = ({ location }) => {
     const [name, setName] = useState('')
     const [room, setRoom] = useState('')
     const [message, setMessage] = useState('')
     const [messages, setMessages] = useState([])
     const [users,setUsers] = useState('')
     const ENDPOINT = 'https://room-chat-app-backend.herokuapp.com/'
    useEffect(() => {
        const {name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', {name,room}, (error) => {
            if(error){
                alert(error)
                window.history.back();
            }
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message',(message) => {
            setMessages(messages => [...messages,message])
        })

        socket.on('roomData', ({ users}) => {
            setUsers(users)
        })
    }, [])

//function for sending messages
const sendMessage = (e) => {
    e.preventDefault()
    if(message){
        socket.emit('sendMessage',message, () => setMessage(''))
    }
}

console.log(message,messages)
    return (
        <div className="outerContainer">
            <div className="container">
            <InfoBar room={room} />
            <OnlineMember users={users} />
            <Messages  messages={messages} name={name} />
            <Input 
                message={message} 
                setMessage={setMessage} 
                sendMessage={sendMessage} 
            />
            
            </div>
        </div>
    )
}

export default Chat