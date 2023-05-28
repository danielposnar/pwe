import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import ChatInput from "./ChatInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatContainer({ currentConversation, currentUser, socket, conversations}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const toastOptions = {
      position: "bottom-right",
      autoClose: 10000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    useEffect(() => {
      const getCurrentChat = async () => {
        if (currentConversation) {
          const mssgs = await axios.get(`${recieveMessageRoute}/${currentConversation._id}`)
          setMessages(mssgs.data);
        }
      };
      getCurrentChat();
    }, [currentConversation]);

    useEffect(() => {
      if (socket.current) {
        socket.current.off("msg-recieve");
        socket.current.on("msg-recieve", (msg) => {
          handleNewMessage(msg);
        });
      }
    }, [currentConversation]);

    const handleSendMessage = async (msg) => {
      const messg= {
        message: msg,
        conversationId: currentConversation._id,
        sender: currentUser.username,
      }
      
      socket.current.emit("send-msg", {
        userIds : currentConversation.userIds,
        data : messg   
      });

      const data = await axios.post(sendMessageRoute, messg);

      handleNewMessage(messg);
    };
  
    useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);
    
    const handleNewMessage =(message) => {
      if(currentConversation){
        if(message.conversationId === currentConversation._id){
          setArrivalMessage(message);
        }
        else{
        toast.info(`New message in ${conversations.find(x => x._id === message.conversationId).conversationName}`,
        toastOptions);
        }
      }
      else{
        toast.info(`New message in ${conversations.find(x => x._id === message.conversationId).conversationName}`,
        toastOptions);
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
    <div style={{ height: 450 }} className="overflow-auto">
        {messages.map((message, index) => {
          return (
            <div key={index}>
                <p className={`p-3 mb-2 bg-light text-dark`} key={`${message._id} text`}> {message.message} </p>
                <p className={`pb-3 text-end ${message.sender === currentUser.username ? " text-primary" : "text-dark"}`} key={`${message._id} sender`}> {message.sender} </p>    
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