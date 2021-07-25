import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

const Join = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="join">
      <div className="join-form">
        <div className="form-start">
          <h2 className="form-icon">
            <i class="fas fa-paper-plane"></i>
          </h2>
          <h3 className="form-t">Let's chat with your friends!</h3>
        </div>
        <form className="form-register">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="register-inp global"
          />
          <input
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            placeholder="Room"
            className="register-inp global"
          />

          <Link
            className="register-btn global"
            to={`/chat?username=${username}&room=${room}`}
            onClick={(e) => (!username || !room ? e.preventDefault() : null)}
            type="submit"
          >
            Join
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Join;
