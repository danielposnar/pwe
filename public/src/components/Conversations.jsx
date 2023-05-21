import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";

export default function Conversations({conversations, changeChat}) {
  const navigate = useNavigate();

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return ( 
    <Form >
      <Form.Group className="mb-3">
      <Form.Label >Conversations</Form.Label>
      <ListGroup>
        {conversations.map((conversation, index) => {
          return (
            <ListGroup.Item>
              <Button variant="primary" type="submit" id={`default-${conversation._id}`} label={`${conversation.conversationName}`} key={index} style={{ width: '100%' }}>
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