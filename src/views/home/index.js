import React, { Component } from 'react';

import { EventsAPI } from 'api/events';

import Header from 'components/Header';
import './style.css';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      fetchingSuccess: false,
      fetchingFailed: false,
      fetchingError: null,
      data: [],
    };
  }

  componentDidMount() {
    this.doFetchPageMetrics();
  }

   doFetchPageMetrics = async () => {
    this.fetchStarted();
    try {
      const end = new Date();
      const start = new Date(end - (1000 * 60 * 60 * 24 * 7));
      const { data } = await EventsAPI.browserMinute(start, end);
      this.fetchSuccess(data);
    } catch (err) {
      this.fetchFailed(err);
    }
  }

  fetchStarted() {
    this.setState({
      fetching: true,
      fetchingError: null,
      fetchingSuccess: false,
    });
  }

  fetchFailed(err) {
    this.setState({
      fetching: false,
      fetchingError: err,
      fetchingSuccess: false,
    });
  }

  fetchSuccess(data, pagination) {
    this.setState({
      fetching: false,
      fetchingError: null,
      fetchingSuccess: true,
      pageData: data,
      paginationData: pagination,
    });
  }

  getFormattedRow(endUser) {
    return {
      id: endUser.id,
      identity: endUser.identity.email || endUser.identity.phone_number,
      lastLogin: endUser.activity.last_login_at,
      firstLoginAttempt: endUser.activity.created_at,
      attributes: !!Object.keys(endUser.attributes).length ? 'Click to view' : 'None',
    };
  }

  getFormattedRows() {
    const {
      pageData,
    } = this.state;

    return pageData.map(this.getFormattedRow);
  }

  onChangePagination = ({ page, pageSize }) => {
    this.setState({
      page,
      perPage: pageSize
    }, this.doFetchUsers)
  }

  toggleModal = () => {
    this.setState(prevState => ({ isAttributeModalOpen: !prevState.isAttributeModalOpen }))
  }

  renderModalContent = () => {
    const {
      selectedUserId,
      pageData,
    } = this.state;

    const endUser = pageData.find(endUser => endUser.id === selectedUserId)

    // TODO: error state
    const attrs = Object.entries(endUser.attributes)

    return (
      <div>
        {!attrs.length &&
          <div>This user has no custom attributes.</div>
        }
    {!!attrs.length && attrs.map((([attr_name, { trusted, value }]) => <div>{attr_name}: {String(value)} <span>({trusted ? 'trusted' : 'not trusted'})</span></div>))}
      </div>
    );
  }

  render() {
    const {
    } = this.state;

    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default Home;
