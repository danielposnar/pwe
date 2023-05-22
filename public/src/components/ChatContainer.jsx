import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentConversation, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    async function GetMessages(){
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const mssgs = await axios.get(`${recieveMessageRoute}/${currentConversation._id}`);
      setMessages(mssgs.data);
    };

    useEffect(() => {
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
          sender: currentUser,
        }   
      });
      await axios.post(sendMessageRoute, {
        message: msg,
        conversationId: currentConversation._id,
        sender: currentUser,
      });
  
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    };

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          if(msg.conversationId === currentConversation._id){
            setArrivalMessage( msg );
          }         
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
    <div>
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    <ChatInput handleSendMessage={handleSendMessage}/>
  </div>
);
      
}