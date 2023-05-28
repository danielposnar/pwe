import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";

export default function Conversations({conversations, changeConversation, socket, handleNewConversation}) {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentConversation = (index, conversation) => {
    setCurrentSelected(index);
    changeConversation(conversation);
    socket.current.on("recieve-conv", (data) => {
      handleNewConversation(data);
    });
  };


  return ( 
    <>
    <h2 style={{ height: 50}}>Conversations</h2>
    <div style={{ height: 450}} className="overflow-auto">
    <Form >
      <Form.Group className="mb-3">      
      <ListGroup>
        {conversations.map((conversation, index) => {
          return (
            <ListGroup.Item key={conversation._id}>
              <Button variant= {`${
                    index === currentSelected ? "primary" : "secondary"}`} id={`default-${conversation._id}`} label={`${conversation.conversationName}`} key={index} style={{ width: '100%' }} onClick={() => changeCurrentConversation(index, conversation)}>
              {conversation.conversationName}
              </Button>
            </ListGroup.Item>           
          );
        })}
      </ListGroup>
      </Form.Group>
    </Form>
    </div>
    </>   
  )
}