import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



export default function ChatInput({ handleSendMessage }){
    const [msg, setMsg] = useState("");
  
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
          setMsg("");
          event.target.value = "";
        }
      };

    return(
    <Container>
        <Form onSubmit={(event) => sendChat(event)}>
            <Form.Group className="mb-3">
                <Form.Control placeholder="type your message here" as="textarea" rows="2" onChange={(e) => setMsg(e.target.value)}/>
            </Form.Group> 
            <Form.Group className="mb-3">
            <Button variant="primary" type="submit" >
                Send
            </Button>{' '}
            </Form.Group>     
        </Form>
    </Container>
    );
}