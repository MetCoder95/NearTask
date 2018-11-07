import React from "react";
import { Col, Grid, Row } from "react-bootstrap";

export default ({ onSubmit }) => {
  return (
    <div>
      <Grid>
        <Row>
          <Col xs={12} md={12}/>
          <p>Made By Me - Charlie Fuentes</p>
          <p> 2018 </p>
        </Row>
      </Grid>
    </div>
  );
};
