import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faSmile,
  faPaperclip
} from '@fortawesome/free-solid-svg-icons';
import cx from 'clsx';

import Layout from 'components/Layout';
import { apiSendMessage } from 'services';
import { KEY_ENTER } from 'config';

import ImgBotAvatar from 'assets/images/bot.png';
import './styles.scss';

class Chat extends Component {
  state = {
    messages: [
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'bot',
        text: 'Hi! How can I help you?'
      },
      {
        author: 'me',
        text: 'Hi! How can I help you?'
      }
    ],
    messageText: ''
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const messagesDiv = document.getElementsByClassName('messages')[0];
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  handleMessageChange = e => this.setState({ messageText: e.target.value });

  handleMessageKeyDown = e => {
    if (e.keyCode === KEY_ENTER) {
      const { messageText } = this.state;
      if (messageText.length > 0) {
        apiSendMessage(messageText)
          .then(({ message }) => {
            const newMessages = [
              { author: 'me', text: messageText },
              { author: 'bot', text: message }
            ];

            this.setState(
              {
                messages: [...this.state.messages, ...newMessages],
                messageText: ''
              },
              this.scrollToBottom
            );
          })
          .catch(err => console.log(err));
      }
    }
  };

  handleLogout = () => this.props.history.push('/');

  renderMessages = messages => (
    <>
      {messages.map(({ author, text }, id) => {
        return (
          <div key={id} className={cx('message', author)}>
            {author === 'bot' && <img src={ImgBotAvatar} alt="bot" />}
            <div className={cx('text', author)}>{text}</div>
          </div>
        );
      })}
    </>
  );

  render() {
    const { messages, messageText } = this.state;

    return (
      <Layout>
        <div className="chat__wrapper">
          <div className="header">
            <div className="top-pane">
              <div className="three-dots"></div>
              <label className="chat-with-us">Chat with us!</label>
              <span className="close" onClick={this.handleLogout}></span>
            </div>
            <div className="bottom-pane">
              <div className="profile">
                <div className="photo">
                  <img src={ImgBotAvatar} alt="bot" />
                  <span className="status"></span>
                </div>
                <div className="details">
                  <span>Jim</span>
                  <p>Support Here</p>
                </div>
              </div>
              <div className="feedback">
                <div className="like">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div className="dislike">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </div>
              </div>
            </div>
          </div>
          <div className="messages__wrapper">
            <div className="messages">{this.renderMessages(messages)}</div>
          </div>
          <div className="write-message">
            <div className="input-field">
              <input
                type="text"
                value={messageText}
                placeholder="Write a message..."
                onChange={this.handleMessageChange}
                onKeyDown={this.handleMessageKeyDown}
              />
            </div>
            <div className="actions">
              <span>
                <FontAwesomeIcon icon={faSmile} />
              </span>
              <span>
                <FontAwesomeIcon icon={faPaperclip} />
              </span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Chat);
