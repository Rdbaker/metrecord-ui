import React, { Component, useRef, useCallback, useLayoutEffect } from 'react';
import useStayScrolled from 'react-stay-scrolled';
import { flatten } from 'ramda';

import LoadingDots from 'components/LoadingDots';
import MessageGroup from 'containers/MessageGroup';

import './style.css'

const ConversationContainer = ({
  messageGroups,
  notifyNewMessage,
  setNotifyNewMessage,
  messagesFetchPending,
  fetchConversationMessages,
  conversationId,
}) => {
  const numMessages = messageGroups.reduce((prevLength, group) => prevLength + group.length, 0);
  const ref = useRef();

  const { stayScrolled, isScrolled } = useStayScrolled(ref);

    // The element just scrolled down - remove new messages notification, if any
  const onScroll = useCallback(() => {
    if (isScrolled()) setNotifyNewMessage(false);
  }, []);

  useLayoutEffect(() => {
    // Tell the user to scroll down to see the newest messages if the element wasn't scrolled down
    setNotifyNewMessage(!stayScrolled());
  }, [messageGroups]);

  return (
    <div className="agora-single-conversation-messages--container" onScroll={onScroll} ref={ref}>
      {messagesFetchPending && <div className="agora-single-conversation-show-more--loading">Loading<LoadingDots /></div>}
      {numMessages % 35 === 0 && <div className="agora-single-conversation-message-show-more" onClick={() => fetchConversationMessages(conversationId, messageGroups[0][0].created_at)}>Show more</div>}
      {messageGroups.map((messageGroup, i) => {
        const group = <MessageGroup group={messageGroup} key={i} />;
        if (i === 0) {
          const firstMessage = messageGroup[0];
          if (!firstMessage) return group;

          const sentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
          return (
            <div key={i}>
              <div>
                <div className="agora-single-conversation-date-break--line"></div>
                <div className="agora-single-conversation-date-break--date">{sentDate.toDateString()}</div>
              </div>
              {group}
            </div>
          );
        } else {
          const lastGroup = messageGroups[i - 1];
          const lastFirstMessage = lastGroup[0];
          const firstMessage = messageGroup[0]
          if (!firstMessage || !lastFirstMessage) return group;

          const firstMessageSentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
          const lastFirstMessageSentDate = new Date(Date.parse(`${lastFirstMessage.created_at}Z`));

          if (firstMessageSentDate.getDate() !== lastFirstMessageSentDate.getDate()) {
            return (
              <div key={i}>
                <div className="agora-single-conversation-date-break--container">
                  <div className="agora-single-conversation-date-break--line"></div>
                  <div className="agora-single-conversation-date-break--date">{firstMessageSentDate.toDateString()}</div>
                </div>
                {group}
              </div>
            );
          } else {
            return group;
          }
        }
      })}
      {notifyNewMessage && <div>Scroll down to new message</div>}
    </div>
  );
}


class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifyNewMessage: false,
    }
  }

  loadMoreMessages = () => {
    const {
      messageGroups,
      fetchMessages,
    } = this.props;

    const messages = flatten(messageGroups);

    const oldestDate = messages.reduce((oldestDateSoFar, message) => {
      const messageDate = new Date(Date.parse(`${message.created_at}Z`));
      return messageDate < oldestDateSoFar ? messageDate : oldestDateSoFar;
    }, new Date());

    fetchMessages(messages[0].conversation_id, oldestDate.toISOString());
  }

  setNotifyNewMessage = (val) => this.setState({ notifyNewMessage: val })

  render() {
    const {
      messagesFetchPending,
      messageGroups,
      conversationId,
    } = this.props;

    const {
      notifyNewMessage,
    } = this.state;

    return (
      <ConversationContainer
        messageGroups={messageGroups}
        notifyNewMessage={notifyNewMessage}
        setNotifyNewMessage={this.setNotifyNewMessage}
        messagesFetchPending={messagesFetchPending}
        fetchConversationMessages={this.loadMoreMessages}
        conversationId={conversationId}
      />
    );
  }
}

export default Conversation;
