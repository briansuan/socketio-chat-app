import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from "react";


// Initialize socket on port 3001
const socket = io.connect("http://localhost:3001")



function App() {

  const [message, setMessage] =  useState("");
  const [messageList, setMessageList] =  useState([]);
  const [messageReceived, setMessageReceived] = useState("");
  const messageContainer = document.getElementById('msg');
  const user = socket.id

  // Uses socket.io to emit a message
  // This function triggers when the "Send" button is clicked 
   const sendMessage =() => {
    // Socket.io emit
    socket.emit("send_message", {message})
    
    //setMessageList((list) => [...list, message]);
    //setMessage("");

    appendMessage(message, messageContainer)
    
    console.log("outgoing: " + message)
  };

  
  //Message Receive
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived("Incoming: " + data.message);
      
      setMessageList((list) => [...list, data]);

      console.log("Message received: ".concat(data.message))
    });
  }, [socket])

  

  // This HTML code is returend/rendered on the frontend
  return (
    <div className="App">
      <div id="message-container" className="convo">
        <h1>Chatting with: {user}</h1>
        <hr></hr>
        <div id="msg">
          {messageList.map((messageContent) => {
            return(
              <div className="incoming-msg">
                {"["+user+"]: " + messageContent.message}
              </div>
            );
          })}
          
        </div>
      </div>
      <div className="input">
        <textarea rows="5" cols="45"
          id="text"
          className="message"
          placeholder="Message..." 
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button className="send" onClick={sendMessage}>Send</button>
      </div>
    </div> 
  );
}

function appendMessage(messageReceived, messageContainer) {
  const messageElement = document.createElement('div')
  messageElement.className = "outgoing-msg"
  messageElement.innerText = "Me: " + messageReceived
  messageContainer.append(messageElement)
}


export default App;
