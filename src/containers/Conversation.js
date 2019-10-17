import { connect } from 'react-redux';

import { fetchMessages } from 'modules/messages/actions';
import { getMessageGroups, messagesFetchPending, firstConversationId } from 'modules/messages/selectors';
import Conversation from 'components/Conversation';


const mapStateToProps = state => ({
  messageGroups: getMessageGroups(state, firstConversationId(state)),
  messagesFetchPending: messagesFetchPending(state, firstConversationId(state)),
});

const mapDispatchToProps = dispatch => ({
  fetchMessages: (conversationId, before) => dispatch(fetchMessages({ conversationId, before }))
});


export default connect(mapStateToProps, mapDispatchToProps)(Conversation);