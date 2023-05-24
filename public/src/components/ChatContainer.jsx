import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import ChatInput from "./ChatInput";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function ChatContainer({ currentConversation, currentUser, users, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const usersMap = new Map();

    async function GetMessages(){
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const mssgs = await axios.get(`${recieveMessageRoute}/${currentConversation._id}`);
      if(currentConversation){
      }
      setMessages(mssgs.data);
    };

    useEffect(() => {
      users.map((user) =>{
        usersMap.set(user._id, user.username);
      });
      usersMap.set(currentUser._id, currentUser.username);
      console.log(usersMap);

      const getCurrentChat = async () => {
        if (currentConversation) {
          GetMessages();
        }
      };
      getCurrentChat();
    }, [currentConversation]);

    const handleSendMessage = async (msg) => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      socket.current.emit("send-msg", {
        userIds: currentConversation.userIds,
        data:{
          message: msg,
          conversationId: currentConversation._id,
          sender: currentUser.username,
        }   
      });
      await axios.post(sendMessageRoute, {
        message: msg,
        conversationId: currentConversation._id,
        sender: currentUser.username,
      });
  
      const msgs = [...messages];
      msgs.push( msg );
      setMessages(msgs);
    };

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          console.log("recieved");
          setArrivalMessage( msg );
        });
      }
    }, []);
  
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
  
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);      

      

return(
  <div>
    <h2 style={{ height: 50}}>
            {currentConversation === undefined ? (
            "Welcome"
          ) : (
            currentConversation.conversationName
          )}
    </h2>
    <div style={{ height: 450 }} class="overflow-auto">
        {messages.map((message) => {
          return (
            <div>
                <p className={`p-3 mb-2 bg-light text-dark`}> {message.message} </p>
                <p className={`pb-3 text-end ${message.sender === currentUser.username ? " text-primary" : "text-dark"}`}> {message.sender} </p>    
            </div>
          );
        })}
    </div>
    <div>
      <ChatInput handleSendMessage={handleSendMessage}/>
    </div>
  </div>
);
      
}