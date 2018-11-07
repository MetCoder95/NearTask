import React, { Component } from "react";
import axios from "axios";
import { Jumbotron, Button } from "react-bootstrap";

class ShowQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: props.quote || ""
    };

    this.onClose = props.close;
  }

  async componentDidMount() {
    if (this.state.quote) {
      return;
    }

    const response = await axios.get("http://0.0.0.0:8000/quotes");

    this.setState({ quote: response.data.payload.quote });
  }

  render() {
    return (
      <Jumbotron>
        <h1>
          {this.state.quote.isFunny
            ? "This Quote is Funny! :)"
            : "This Quote is not Funny! :("}
        </h1>
        <p>{this.state.quote.quote ? this.state.quote.quote : "No Quote"}</p>
        <p>
          <Button bsStyle="primary" onClick={this.onClose}>
            Close
          </Button>
        </p>
      </Jumbotron>
    );
  }
}

export default ShowQuote;
