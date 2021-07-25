import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const serverURL = "http://localhost:3001";

const Chat = () => {
  const inputEl = useRef(); 
  const [typing, setTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(serverURL, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: Infinity,
    });
    const { username, room } = queryString.parse(window.location.search);

    setRoom(room);
    setUsername(username);

    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [serverURL, window.location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
      window.scrollTo(0, document.body.scrollHeight)
    });
  }, []);

  
  console.log(typingUsers);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit(
        "sendMessage",
        { from: username, msg: message, room },
        () => (inputEl.current.value = "")
      );
      setMessage("")
    }
  };

  const handleClass = (className) => {
    if (className === "System") {
      return "System";
    } else if (className === username) {
      return "your";
    } else if (className !== username && className !== "System") {
      return "other";
    }
  };

  

  return (
    <div className="chat">
      <div className="chat-up">
        <h3 className="room-t">{room}</h3>
        <h3 className="username">{username}</h3>
      </div>
      <div className="chat-messaging">
        {messages.map((message) => (
          <div className={`messages ${handleClass(message.from)}`}>
            <h4 className="username">
              {message.from === "System" ? null : message.from}
            </h4>
            <p className="message">{message.msg}</p>
          </div>
        ))}
      </div>
      <form className="chat-down">
        <input
          onKeyPress={() => setTyping(true)}
          onKeyUp={() => setTyping(false)}
          ref={inputEl}
          autoFocus
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type something..."
        />
        <button onClick={sendMessage} type="submit">
          <i class="fas fa-paper-plane"></i>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
