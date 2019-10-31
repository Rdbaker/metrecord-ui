import React from 'react';
import cx from 'classnames';


const CountChart = ({
  count,
  size,
}) => (
  <div className={cx("count-chart--container", size)}>
    <div className="count-chart--value">
      {count}
    </div>
  </div>
)

export default CountChart;
