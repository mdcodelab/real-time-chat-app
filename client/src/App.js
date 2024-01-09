import React from "react";
import './App.css';
import styled from "styled-components";
import { IoSendOutline } from "react-icons/io5";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:4000");

function App() {
  const [username, setUsername] = React.useState("");
  const [room, setRoom] = React.useState("");
  const[showChat, setShowChat]=React.useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "" && !showChat) {
      socket.emit("join_room", room);
      setShowChat(!showChat);
    }
  };


  return (
    <Wrapper className="app">
      <div className={`live_chat_enter ${showChat ? "none" : ""}`}>
        <h3>Join Live Chat</h3>
        <input
          type="text"
          placeholder="Username ..."
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Room ID..."
          onChange={(e) => setRoom(e.target.value)}
        ></input>
        <button onClick={joinRoom}>
          <IoSendOutline></IoSendOutline>
        </button>
      </div>
      <Chat className="chat" socket={socket} username={username} room={room} showChat={showChat} setShowChat={setShowChat}></Chat>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  background: #fff;
  color: #212121;
  font-family: "Open Sans", sans-serif;
  display: grid;
  place-items: center;
  margin: 0 auto;
  position: relative;
  overflow-y: hidden;
  border: 2px solid red;

  .live_chat_enter {
    width: 290px;
    height: 70vh;
    position: absolute;
    right: 3rem; bottom: 0;
    padding: 2rem;
    border: 3px solid black;
  }

  .none {
    height: 0;
    visibility: hidden;
    opacity: 0;
  }

  .live_chat_enter h3 {
    text-align: center;
    margin: 3rem;
    font-size: 1.5rem;
  }

  .live_chat_enter input {
    display: bloch;
    width: 100%;
    padding: 0.5rem 0;
    border-radius: 0.3rem;
    margin-bottom: 1.5rem;
  }
  .live_chat_enter button {
    display: block;
    margin: 0 auto;
    padding: 0.3rem 0.5rem;
    font-size: 1.2rem;
    width: 10rem;
    background: green;
    color: #fff;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: all 0.7s ease;
  }

  .live_chat_enter button:hover {
    color: black;
    background: lightgreen;
  }

`;

export default App;
