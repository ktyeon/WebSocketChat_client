import React, { useEffect, useState } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])
 
  console.log("message List", messageList);
 
  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((prevState) => prevState.concat(message))
      console.log("Server response:", message);
    });

    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("Enter your nickname:");

    if (userName !== null && userName.trim() !== "") {
      console.log("Entered username:", userName);

      socket.emit("signin", userName, (res) => {
        console.log("Server response:", res);

        if (res?.ok) {
          setUser(res.data);
        } else {
          console.error("Error during signin:", res?.error);
        }
      });
    } else {
      console.log("Invalid username. Please enter a valid nickname.");
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });

    setMessage('');
  };

  return (
    <div>
      <div className="App">
      <MessageContainer messageList = {messageList} user = {user} /> 
      <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
