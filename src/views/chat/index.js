import React from 'react';

import Conversation from 'containers/Conversation';
import Composer from 'containers/Composer';


const ChatView = () => (
  <div className="agora-chat-view--container">
    <Conversation />
    <Composer />
  </div>
);


export default ChatView;