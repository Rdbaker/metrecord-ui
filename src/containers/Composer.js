import { connect } from 'react-redux';

import { sendMessage } from 'modules/messages/actions';
import { firstConversationId } from 'modules/messages/selectors';
import ComposerComponent from 'components/Composer';


const mapStateToProps = state => ({
  conversationId: firstConversationId(state),
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (conversationId, body) => dispatch(sendMessage({ conversationId, body })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposerComponent)