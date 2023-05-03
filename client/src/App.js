import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from "react";


// Initialize socket on port 3001
const socket = io.connect("http://localhost:3001")

function App() {

  const [message, setMessage] =  useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const messageContainer = document.getElementById('message-container')
  const user = socket.id

  // Uses socket.io to emit a message
  // This function triggers when the "Send" button is clicked 
   const sendMessage =() => {
    // Socket.io emit
    socket.emit("send_message", { message })
    appendMessage(message);
  };

  // Listen to event using useEffect react hook
  // This function will be called everytime an event is thrown on socket.io server 
  // by passing "socket" variable inside dependency list in the useEffect function
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
    
  }, [socket])

  function appendMessage(messageReceived) {
    const messageElement = document.createElement('div')
    messageElement.innerText = messageReceived 
    messageContainer.append(messageElement)
  }

  // This HTML code is returend/rendered on the frontend
  return (
    <div className="App">
      <div id="message-container" className="convo">
        <h1>Chatting with: {user}</h1>
        <hr></hr>
        {messageReceived}
      </div>
      <div className="input">
        <textarea rows="5" cols="45"
          className="message"
          placeholder="Message..." 
          onChange={(event) => {
            setMessage(event.target.value);
        }}/>
        <button className="send" onClick={sendMessage}>Send</button>
      </div>
    </div> 
  );
}

export default App;
