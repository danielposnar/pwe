import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >Chat app</Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            author: Martin Vondráček
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <App />
  </React.StrictMode>
);

