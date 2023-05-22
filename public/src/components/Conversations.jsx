import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";

export default function Conversations({conversations, changeConversation}) {
  const navigate = useNavigate();
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentConversation = (index, conversation) => {
    setCurrentSelected(index);
    changeConversation(conversation);
  };


  return ( 
    <Form >
      <Form.Group className="mb-3">
      <Form.Label >Conversations</Form.Label>
      <ListGroup>
        {conversations.map((conversation, index) => {
          return (
            <ListGroup.Item key={index}>
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
    
  )
}