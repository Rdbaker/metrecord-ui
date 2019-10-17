import { connect } from 'react-redux';
import { path } from 'ramda';


import { getUser } from 'modules/user/selectors';
import MessageGroupComponent from 'components/MessageGroup';


const mapStateToProps = (state, props) => ({
  author: getUser(state, path(['group', '0', 'author_id'], props)),
});

export default connect(mapStateToProps)(MessageGroupComponent);