import React from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { IoSendOutline } from "react-icons/io5";
import { PiChatsCircleLight } from "react-icons/pi";

function Chat({ socket, username, room, showChat, setShowChat }) {
  const [currentMessage, setCurrentMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

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
    console.log("Before socket.on('receive_message')");
    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessageList((list) => [...list, data]);
    });
    console.log("After socket.on('receive_message')");
  }, [socket]);


  console.log(messageList);

  return (
    <Wrapper className={`chat_window-container ${!showChat ? "none" : ""}`}>
        <div className="chat_window">
          <div className="chat_header">
            <h3>How Can I Help You?</h3>
            <IoMdClose
              className="header_icon"
              onClick={() => setShowChat(!showChat)}
            ></IoMdClose>
          </div>

          <div className="chat_body">
            {messageList.length > 0 ? (
              messageList.map((messageContent, index) => {
                return (
                  <div
                    key={index}
                    className="message"
                    id={username === messageContent.author ? "Mihaela" : "You"}>
                    <div className="message_author">
                      <p>{messageContent.author}:</p>
                    </div>
                    <div className="message_container">
                      <p className="message_content">{messageContent.message}</p>
                      <p className="message_time">{messageContent.time}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="pending">
                <PiChatsCircleLight className="pending_icon"></PiChatsCircleLight>
                <p>
                  Send a message, I'm usually able to get back to you in a few
                  moments.
                </p>
              </div>
            )}
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
        </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
height: 70vh;
width: 300px;
position: absolute;
bottom: 0;
right: 3rem;
background: red;


.chat_window {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 0.3rem;
  border: 3px solid red;
}

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
    background: #fff;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0.5rem;
  }

  .pending {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    height: 10rem;
    line-height: 2rem;
    margin: 0 auto;
    color: green;
    margin-top: 5rem;
  }

  .pending_icon {
    font-size: 3rem;
    color: green;
  }

  .message {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 0.8rem;
    border-radius: 0.3rem;
    border: 2px solid red;
  }

  .message p {
    margin: 0; padding: 0;
  }

  .message_author{
    text-align: left;
  }

  .message_content {
    text-align: left;
  }

  .message_time {
    text-align: right;
    font-size: 0.8rem;
    color: red;
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
    width: 80%;
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
