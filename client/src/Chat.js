import React from "react";
//import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { IoSendOutline } from "react-icons/io5";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [showChat, setShowChat]=React.useState(true);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      console.log(currentMessage);
      setCurrentMessage("");
    }
  };

  React.useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList);
    });
  }, [socket, messageList]);

console.log(messageList);

  return (
    <>
      {showChat && (
        <Wrapper className="chat_window">
          <div className="chat_header">
            <h3>How Can I Help You?</h3>
            <IoMdClose
              className="header_icon"
              onClick={() => setShowChat(!showChat)}
            ></IoMdClose>
          </div>

          <div className="chat_body">
          {messageList.length > 0 ? 
          (messageList.map((messageContent, index)=> {
            return <div>{messageContent.message}</div>
          })) : 
          (<div>hello</div>)}
          </div>

          <div className="chat_footer">
            <input
              type="text"
              className="chat_input"
              value={currentMessage}
              placeholder="Send a message..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button className="chat_button" onClick={sendMessage}>
              <IoSendOutline></IoSendOutline>
            </button>
          </div>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  width: 290px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 0.3rem;
  background: #fff;

  //header
  .chat_header {
    background: black;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.3rem;
    padding: 0 0.3rem;
  }

  .chat_header h3 {
    margin: 0;
    font-size: 1.1rem;
    color: #fff;
  }

  .header_icon {
    color: grey;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .header_icon:hover {
    color: #fff;
    transform: scale(1.3);
  }

  //body
  .chat_body {
    height: calc(70vh - 5.5rem);
  }

  .chat_body {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  //footer
  .chat_footer {
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .chat_input {
    width: 50%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 1rem;
  }

  .chat_button {
    width: 20%;
    height: 100%;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: navy;
    transition: all 0.7s ease;
  }
  .chat_button:hover {
    color: black;
    transform: scale(1.5);
  }
`;

export default Chat;
