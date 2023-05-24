import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentConversation, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
      const getCurrentChat = async () => {
        if (currentConversation) {
          const mssgs = await axios.get(`${recieveMessageRoute}/${currentConversation._id}`)
          setMessages(mssgs.data);
        }
      };
      getCurrentChat();
    }, [currentConversation]);

    const handleSendMessage = async (msg) => {
      const messg= {
        message: msg,
        conversationId: currentConversation._id,
        sender: currentUser.username,
      }
      console.log(currentConversation.conversationName);
      socket.current.emit("send-msg", {
        userIds : currentConversation.userIds,
        data : messg   
      });

      const data = await axios.post(sendMessageRoute, messg);

      handleNewMessage(messg);
    };

    useEffect(() => {
      if (socket.current) {
        socket.current.off("msg-recieve");
        socket.current.on("msg-recieve", (msg) => {
          handleNewMessage(msg);
        });
      }
    }, [currentConversation]);
  
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    
    const handleNewMessage =(message) => {
      if(message.conversationId === currentConversation._id){
        setArrivalMessage(message);
      }
    }

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
        <div ref={scrollRef}/>
    </div>
    <div>
      <ChatInput handleSendMessage={handleSendMessage}/>
    </div>
  </div>
);
      
}