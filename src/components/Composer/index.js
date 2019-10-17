import React, { Component } from 'react';


import './style.css'

class Composer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  maybeSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit = () => {
    const {
      inputValue,
    } = this.state;

    const {
      conversationId,
      sendMessage,
    } = this.props

    sendMessage(conversationId, inputValue);
    this.setState({
      inputValue: '',
    });
  }

  handleChange = (e) => this.setState({ inputValue: e.target.value });

  render() {
    const {
      inputValue,
    } = this.state;

    return (
      <div className="agora-chat-composer">
        <input placeholder="Say hello..." onChange={this.handleChange} onKeyDown={this.maybeSubmit} value={inputValue} />
      </div>
    )
  }
}

export default Composer