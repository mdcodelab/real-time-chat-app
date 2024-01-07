import React from "react";
//import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
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
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList);
    });
  }, [socket, messageList]);

console.log(messageList);
  return (
    <div className="container">
      <div className="chat-header">
        <p>How Can I help You?</p>
      </div>

      <div className="chat-body"></div>

      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Your message..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
