import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { allUsersRoute, allUsersConversationRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Container from 'react-bootstrap/Container';
import Conversations from "../components/Conversations";
import NoChat from "../components/NoChat";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { io } from "socket.io-client";
import ChatContainer from "../components/ChatContainer";

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(undefined);

  async function SetCurrentUser(){
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }
  
  useEffect(() => {
    if(currentUser){
      if(!socket.current){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
        socket.current.on("recieve-conv", (data) => {
          handleNewConversation(data);
        });
      }
    }     
  }, [currentUser]);

  useEffect(() => {
    SetCurrentUser();
  }, []);

  useEffect( () => {
    if (currentUser) {

      const  FetchContactsData = async() => {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      }
      FetchContactsData();
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      const FetchConverationsData = async() => {
        const data = await axios.get(`${allUsersConversationRoute}/${currentUser._id}`);
        setConversations(data.data);
      }
      FetchConverationsData();
    }
  }, [currentUser]);

  const handleChatChange = (conversation) => {  
    setCurrentConversation(conversation);
  };

  const handleNewConversation = (conversation) => {
    setNewConversation(conversation);
  };

  useEffect(() => {
    newConversation && setConversations((prev) => [...prev, newConversation]);
  }, [newConversation]);

  return (
    <div>
      <Container>
        <Row>
        <Col>
        <Contacts contacts={contacts} socket={socket} handleNewConversation={handleNewConversation}/>
        </Col>
        <Col xs={5}>
          <Row>
          {currentConversation === undefined ? (
            <NoChat />
          ) : (
            <ChatContainer class="h-25 d-inline-block" currentConversation={currentConversation} currentUser={currentUser} socket={socket}/>
          )}
          </Row>
        </Col>
        <Col>
        <Conversations conversations={conversations} changeConversation={handleChatChange} currentUser={currentUser} socket={socket} handleNewConversation={handleNewConversation}/>
        </Col>
        </Row>      
      </Container>     
    </div>
    
  )
}

export default Chat