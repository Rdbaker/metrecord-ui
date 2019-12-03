import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { EndUsersAPI } from 'api/endUsers';
import LoadingPulse from 'components/LoadingPulse/index';
import { uuidToName } from 'utils/generateName';

import './style.css';

const pageToRow = page => {
  const name = uuidToName(page.end_user_id);
  return (
    <div className="end-user-table--row" key={page.end_user_id}>
      <Link className="end-user-table--cell" to={`/users/${page.end_user_id}`}>{name}</Link>
      <div className="end-user-table--cell">{page.event_count}</div>
      <div className="end-user-table--cell">{page.last_seen}</div>
    </div>
  );
};

class EndUsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.neverLoaded) {
      this.fetchPage();
    }
  }

  fetchPage = async () => {
    this.setState({
      loading: true
    });
    try {
      const { data } = await EndUsersAPI.paginateEndUsers();
      this.props.receiveEndUserPage(data);
      this.setState({
        loading: false
      });
    } catch (e) {
      console.warn('could not fetch users', e);
    }
  }

  render() {
    const {
      loading,
    } = this.state;

    const {
      endUserPage,
      neverLoaded,
    } = this.props;

    if (loading || neverLoaded) {
      return <LoadingPulse />;
    }

    const endUserRows = endUserPage.map(page => pageToRow(page));

    return (
      <div className="typeahead-top-row--container">
        <div className="typeahead-name--container">
          <div className="typeahead-result-field--label">name</div>
        </div>
        <div>
          {endUserRows}
        </div>
      </div>
    )
  }
}

export default EndUsersPage;