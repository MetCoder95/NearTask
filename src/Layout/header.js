import React from "react";
import { Navbar, Button } from "react-bootstrap";

export default ({ showQuote, showForm }) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#home">Quote Generator</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullRight>
          <Button type="submit" bsStyle="success" onClick={showQuote}>
            Get Quote!
          </Button>
        </Navbar.Form>

        <Navbar.Form pullLeft>
          <Button type="submit" bsStyle="default" onClick={showForm}>
            Create a Quote!
          </Button>
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
