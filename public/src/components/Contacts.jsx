import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createNewConversation } from "../utils/APIRoutes";


export default function Contacts({ contacts, socket, handleNewConversation}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [conversationName, setConversationName] = useState("");
  const [newConversation, setNewConversation] = useState(null);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSelectedUsersChange = (event) =>  {
    const index = selectedUsers.indexOf(event.target.id);
    if(index === -1){
      selectedUsers.push(event.target.id);
    }else{
      selectedUsers.splice(index, 1);
    }
  };

  const handleConversationNameChange = (event) =>{
    setConversationName(event.target.value);
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

  const handleValidation = () => {
    if (!conversationName) {
      toast.error(
        "Write conversation name",
        toastOptions
      );
      return false;
    } else if (selectedUsers.length < 1) {
      toast.error(
        "Select users for conversation",
        toastOptions
      );
      return false;
    } 
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allUserIds = selectedUsers.concat([currentUser._id]);
    if (handleValidation()){     
      
      const { data } = await axios.post(createNewConversation, {
         conversationName,
         userIds: allUserIds,
      });

      if (data.status === true) {
        
      }else{
        toast.error(data.msg, toastOptions);
      }   
      if(socket.current){
        console.log("send_conv");
        socket.current.emit("send-conv", {
          conversationName,
          userIds: selectedUsers,
       });
      }
      handleNewConversation({
        conversationName,
        selectedUsers,
     });  
    }
  }

  useEffect(() => {

    SetCurrentUser();
  }, []);

  return ( 
    <>
    <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
      <Form.Label >Users</Form.Label>
      <ListGroup>
        {contacts.map((contact, index) => {
          return (
            <ListGroup.Item key={`${contact._id}`}>
              <Form.Check id={`${contact._id}`} label={`${contact.username}`} key={index} style={{ width: '100%' }} onChange={handleSelectedUsersChange}/>
            </ListGroup.Item>           
          );
        })}
      </ListGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control placeholder="Enter name of new conversation" label="newConversation" name="newConversation" min="3" onChange={handleConversationNameChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit">
          Create conversation
        </Button>{' '}
      </Form.Group>
    </Form>
    <ToastContainer />
    </> 
  )
}
