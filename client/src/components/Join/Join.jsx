import React from "react";
import "./Join.css";

const Join = () => {
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
          <input type="text" placeholder="Username" className="register-inp global" />
          <input type="text" placeholder="Room" className="register-inp global" />
          <button type="submit" className="register-btn global">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;
