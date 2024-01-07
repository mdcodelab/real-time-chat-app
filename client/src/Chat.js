import React from "react";
import styled from "styled-components";
import { IoSendOutline } from "react-icons/io5";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = React.useState("");

  async function sendMessage() {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        username: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setCurrentMessage(messageData);

      await socket.emit("send_message", messageData);
    }
  }

  return (
    <Wrapper>
      <div className="chat__header">
        <p>How can I Help You?</p>
      </div>

      <div className="chat__body"></div>

      <div className="chat__footer">
        <input
          type="text"
          placeholder="Your message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
        ></input>
        <button onClick={sendMessage}>
          <IoSendOutline></IoSendOutline>
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Chat;
