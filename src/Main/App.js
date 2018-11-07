import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { Header, Footer } from "../Layout";
import { QuoteForm, ShowQuote } from "./Components";
import "./App.css";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      showForm: false,
      quote: ""
    };
  }

  showQuote() {
    this.setState({ show: true, showForm: false });
  }

  showForm() {
    this.setState({ showForm: true, form: false });
  }

  onCloseQuote() {
    this.setState({ show: false });
  }

  onCloseForm() {
    this.setState({ showForm: false });
  }

  render() {
    const { show, showForm, quote } = this.state;
    return (
      <div className="App">
        <Header
          showQuote={this.showQuote.bind(this)}
          showForm={this.showForm.bind(this)}
        />
        {show ? (
          <ShowQuote quote={quote} close={this.onCloseQuote.bind(this)} />
        ) : showForm ? (
          <QuoteForm onClose={this.onCloseForm} onSubmit={this.onSubmit} />
        ) : (
          <Jumbotron>
            <h1>
              Welcome to Quote Generator!
            </h1>
            <p>
              Click on "Get Quote!" to get an amazing quote!
            </p>
          </Jumbotron>
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
