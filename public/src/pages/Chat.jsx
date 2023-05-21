import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { allUsersRoute, allUsersConversationRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Container from 'react-bootstrap/Container';
import Conversations from "../components/Conversations";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { io } from "socket.io-client";

function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  async function FetchContactsData(){
    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
    setContacts(data.data);
  }

  async function FetchConverationsData(){
    const data = await axios.get(`${allUsersConversationRoute}/${currentUser._id}`);
    setConversations(data.data);
  }

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
    SetCurrentUser();
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      FetchContactsData();
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      FetchConverationsData();
    }
  }, [currentUser]);

  return (
    <div>
      <Container>
        <Row>
        <Col>
        <Contacts contacts={contacts}/>
        </Col>
        <Col>
        <Conversations conversations={conversations}/>
        </Col>
        </Row>
        
        
      </Container>     
    </div>
  )
}

export default Chat