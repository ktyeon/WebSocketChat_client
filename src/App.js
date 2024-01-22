import { useEffect, useState, setUser } from "react";
import "./App.css";
import socket from "./server";

function App() {
 const [user, setUser] = useState(null);
  
  useEffect(() => {

    askUserName();

  }, []);

  const askUserName = () => {
    const userName = prompt("Enter your nickname:");
  
    // Check if the user entered a valid username (not null and not an empty string)
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
      // Handle the case where the user did not enter a valid username
      // You might want to show an error message to the user or take appropriate action
    }
  };

 
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
