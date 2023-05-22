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
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control placeholder="type your message here" as="textarea" rows="3" onChange={(e) => setMsg(e.target.value)}/>
            </Form.Group> 
            <Button variant="primary" type="submit" >
                Send
            </Button>{' '}
        </Form>
    </Container>
    );
}