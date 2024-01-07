import React from "react";
//import './App.css';
import styled from "styled-components";
import { IoSendOutline } from "react-icons/io5";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:4000");

function App() {
  const[username, setUsername]=React.useState("");
  const [room, setRoom] = React.useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <Wrapper className="App">
      <h3>Join Live Chat</h3>
      <input type="text" placeholder="Username ..." onChange={(e)=> setUsername(e.target.value)}></input>
      <input type="text" placeholder="Room ID..." onChange={(e)=> setRoom(e.target.value)}></input>
      <button onClick={joinRoom}><IoSendOutline></IoSendOutline></button>
      <Chat socket={socket} username={username} room={room}></Chat>
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
  
`;

export default App;
