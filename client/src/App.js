import React from "react";
import './App.css';
import styled from "styled-components";
import { IoSendOutline } from "react-icons/io5";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
  const[username, setUsername]=React.useState("");
  const [room, setRoom] = React.useState("");

  function joinRoom () {
    if(username !== "" && room !==""){
      socket.emit("join_room", room);
      
    }
  }


  return (
    <Wrapper className="App">
      <h3>How can I help?</h3>
      <input type="text" placeholder="Message ..." onChange={(e)=> setUsername(e.target.value)}></input>
      <input type="text" placeholder="Room ID..." onChange={(e)=> setRoom(e.target.value)}></input>
      <button onClick={joinRoom}><IoSendOutline></IoSendOutline></button>
    </Wrapper>
  );
}

const Wrapper = styled.div`

`;

export default App;
