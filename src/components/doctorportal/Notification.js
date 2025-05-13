import React, { useState } from "react";
import "./doctorportalcss/Notification.css"; // Import the styles for the notification

function Notification() {
  const [showMessages, setShowMessages] = useState(false);

  const toggleMessages = () => {
    setShowMessages(!showMessages);
  };

  return (
    <div className="notification-container">
      <div className="notification-icon" onClick={toggleMessages}>
        <img src="notification.jpg" alt="Bell Icon" />
      </div>
      
      {showMessages && (
        <div className="notification-messages">
          <p>You have 3 new notifications</p>
          <ul>
            <li>New comment on your post</li>
            <li>Doctor appointment reminder</li>
            <li>Message from admin</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notification;
