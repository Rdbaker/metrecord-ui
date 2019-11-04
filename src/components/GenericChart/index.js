import React, { PureComponent, Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faCheck, faTimes } from '@fortawesome/pro-regular-svg-icons';
import cx from 'classnames';

import LoadingDots from 'components/LoadingDots';

import CountChart from './CountChart';
import AreaChart from './AreaChart';
import './style.css';



const ONE_MINUTE = 1000 * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_THOUSAND_MINUTE = ONE_MINUTE * 1000;

const createSeriesFromCategory = (categoryData, earliestDate, latestDate) => {
  const dateToCountMap = {}

  categoryData.forEach(({ x, y }) => {
    const dateValue = new Date(x).valueOf();
    dateToCountMap[dateValue] = y
  });

  let offset = 0
  const interval = latestDate - earliestDate >= ONE_THOUSAND_MINUTE ? ONE_HOUR : ONE_MINUTE;

  // fill in all days that have no data with 0 values
  while (earliestDate + offset <= latestDate) {
    if (!dateToCountMap.hasOwnProperty(earliestDate + offset)) {
      dateToCountMap[earliestDate + offset] = null
    }
    offset += interval;
  }

  return {
    type: 'area',
    marker: {
      symbol: 'circle',
    },
    data: Object.entries(dateToCountMap).map(([date, number]) => ({
      x: Number(date),
      y: number !== null ? Math.round(number) : null,
    })).sort((a, b) => a.x - b.x)
  };
}

const createSeriesFromRawData = (rawData, type) => {
  if (type === 'LINE' || type === 'AREA') {
    const data = rawData.map(datum => ({y: Number(datum.value), x: new Date(datum.minute)}));

    const dates = rawData.map(datum => new Date(datum.minute));
    const earliestDate = Math.min(...dates.map(x => Number(x)));
    const latestDate = Math.max(...dates.map(x => Number(x)));
    return createSeriesFromCategory(data, earliestDate, latestDate);
  }
}

const EmptyChart = ({
  title,
}) => (
  <div className="generic-chart-empty-chart--container">
    <h4>{title}</h4>
    <div className="generic-chart-empty-chart--text">
      You have no data to display here!
    </div>
  </div>
)

export const LoadingChart = ({
  title,
}) => (
  <div className="generic-chart-loading-chart--container">
    <h4>{title}</h4>
    <div className="generic-chart-loading-chart--text">
      Loading your chart<LoadingDots />
    </div>
  </div>
)

class GenericChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isEditingTitle: false,
      titleInput: this.props.title,
    };
  }

  componentDidMount() {
    if (this.props.neverFetched && this.props.fetchChartData) {
      this.props.fetchChartData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.neverFetched && !prevProps.neverFetched && this.props.fetchChartData) {
      this.props.fetchChartData();
    }
  }

  onChangeInput = (e) => {
    this.setState({
      messageInput: e.target.value,
    });
  }

  setEditingTitle = () => this.setState({ isEditingTitle: true })

  maybeSubmit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.submitTitle();
    } else if (e.keyCode === 27) {
      e.preventDefault();
      this.titleCancel();
    }
  }

  submitTitle = () => {
    this.props.onTitleChange(this.state.titleInput);
    this.setState({
      isEditingTitle: false
    });
  }

  titleCancel = () => {
    this.setState({
      isEditingTitle: false,
      titleInput: this.props.title,
    })
  }

  renderChart() {
    const {
      loading,
      data,
      neverFetched,
      size='medium',
      type,
      title,
      agg,
      event,
      yAxisLabel,
      interpolateMissing,
    } = this.props;

    if (!loading && data && data.length === 0) {
      return <EmptyChart title={title} />
    } else if (loading || neverFetched) {
      return <LoadingChart title={title} />
    } else if (type === 'COUNT') {
      return <CountChart count={agg === 'sum' ? data[0].sum : data[0].count} title={title} size={size} event={event} />
    } else if (type === 'AREA') {
      return <AreaChart interpolateMissing={interpolateMissing} agg={agg} data={data} title={title} size={size} event={event} yAxisLabel={yAxisLabel} />
    } else {
      const options = createPlotOptions(createSeriesFromRawData(data, type), title);
      return <HighchartsReact highcharts={Highcharts} options={options} />
    }
  }

  render() {
    const {
      title,
      size,
    } = this.props;
    const {
      isEditingTitle,
      titleInput,
    } = this.state;

    return (
      <div className={cx("generic-chart--container", size)}>
        {!isEditingTitle && <div className="generic-chart--title">{title} {!!this.props.onTitleChange && <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.setEditingTitle} icon={faPencil} size="xs" /></div>}</div>}
        {isEditingTitle && <div><input ref={(title) => { this.$title = title }} value={titleInput} autoFocus={true} onKeyDown={this.maybeSubmit} onChange={(e) => this.setState({ titleInput: e.target.value })} /> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.submitTitle} icon={faCheck} size="xs" /></div> <div className="font-awesome-icon--container"><FontAwesomeIcon onClick={this.titleCancel} icon={faTimes} size="xs" /></div></div>}
        {this.renderChart()}
      </div>
    )
  }
}


export default GenericChart;
