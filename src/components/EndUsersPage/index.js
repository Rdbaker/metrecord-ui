import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { EndUsersAPI } from 'api/endUsers';
import LoadingPulse from 'components/LoadingPulse/index';
import { uuidToName } from 'utils/generateName';

import './style.css';

const formatDate = date => {
  return date.toLocaleString(window.navigator.language, { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
}

const formatNum = new Intl.NumberFormat(window.navigator.language)

const pageToRow = page => {
  const name = uuidToName(page.end_user_id);
  const lastSeen = new Date(page.last_seen);
  return (
    <tr className="end-user-table--row" key={page.end_user_id}>
      <td>
        <Link className="end-user-table--cell" to={`/users/${page.end_user_id}`}>{name}</Link>
      </td>
      <td className="end-user-table--cell">{formatNum.format(page.event_count)}</td>
      <td className="end-user-table--cell">{formatDate(lastSeen)}</td>
    </tr>
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
      <div className="end-users-page--container">
        <h1>Your visitors</h1>
        <table className="end-user--table">
          <thead>
            <tr>
              <th>name</th>
              <th># of events</th>
              <th>last seen</th>
            </tr>
          </thead>
          <tbody>
            {endUserRows}
          </tbody>
        </table>
      </div>
    )
  }
}

export default EndUsersPage;