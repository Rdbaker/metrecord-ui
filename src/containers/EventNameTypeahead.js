import { connect } from 'react-redux';

import EventNameTypeahead from 'components/EventNameTypeahead';
import { fetchNameTypeahead } from 'modules/events/actions';
import { nameTypeaheadStale, nameTypeaheadLoading, nameTypeaheadData } from 'modules/events/selectors';

// TODO: this might not react to store changes
const mapStateToProps = state => ({
  typeaheadStale: name => nameTypeaheadStale(state, name),
  typeaheadLoading: name => nameTypeaheadLoading(state, name),
  typeaheadData: name => nameTypeaheadData(state, name),
});

const mapDispatchToProps = dispatch => ({
  dispatcher: {
    fetchNameTypeahead: (name) => dispatch(fetchNameTypeahead(name)),
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(EventNameTypeahead);
