import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup';
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Logout from "../components/Logout";
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
        if(socket.current){
          socket.current.emit("send-conv", {
            _id: data.conversation._id,
            conversationName,
            userIds: allUserIds,
         });
        }
        handleNewConversation({
          _id: data.conversation._id,
          conversationName,
          selectedUsers,
       });  
        
      }else{
        toast.error(data.msg, toastOptions);
      }   
    }
  }

  useEffect(() => {

    SetCurrentUser();
  }, []);

  return ( 
    <>
    <h2 style={{ height: 50}}>Users</h2>
    <Form onSubmit={handleSubmit}>
      <div style={{ height: 450}} class="overflow-auto">
      <Form.Group className="mb-3">      
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
      </div>
      <div>
      <Form.Group className="mb-3">
        <Form.Control placeholder="Enter name of new conversation" label="newConversation" name="newConversation" min="3" onChange={handleConversationNameChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="primary" type="submit">
          Create conversation
        </Button>{' '}
      </Form.Group>
      </div>     
    </Form>
    <ToastContainer />
    </> 
  )
}
