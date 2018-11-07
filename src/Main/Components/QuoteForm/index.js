import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  HelpBlock,
  ControlLabel,
  Button,
  Jumbotron
} from "react-bootstrap";
import axios from "axios";

import { ShowQuote } from "../";

class FormQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      leyend: "",
      quote: ""
    };

    this.onClose = props.onClose;
  }

  async onSubmit(e) {
    e.preventDefault();
    if (!this.state.value) {
      this.setState({ leyend: "No content to send!" });
      return;
    }

    const response = await axios
      .post("http://0.0.0.0:8000/quotes", { quote: this.state.value })
      .catch(err => {
        this.setState({ leyend: err.response.data.payload.reason });
      });

    this.setState({ quote: response.data.payload.quote });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return "success";
    else if (length > 5) return "warning";
    else if (length > 0) return "error";
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { quote } = this.state;
    return quote ? (
      <ShowQuote quote={quote} />
    ) : (
      <Jumbotron>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
            style={{ margin: "35px" }}
          >
            <ControlLabel style={{ fontSize: 50 }}>Write a Quote</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Enter your quote"
              onChange={this.handleChange.bind(this)}
              style={{ marginTop: "50px" }}
            />

            <Button
              type="submit"
              bsStyle="success"
              style={{ marginTop: "50px" }}
              onClick={this.onSubmit.bind(this)}
            >
              Save Quote!
            </Button>
            <Button
              type="submit"
              bsStyle="danger"
              style={{ marginTop: "50px", marginLeft: "15px" }}
              onClick={this.onClose}
            >
              {" "}
              Close{" "}
            </Button>
            <FormControl.Feedback />
            <HelpBlock>
              {this.state.leyend
                ? this.state.leyend
                : "Validation is based on string length."}
            </HelpBlock>
          </FormGroup>
        </form>
      </Jumbotron>
    );
  }
}

export default FormQuote;
