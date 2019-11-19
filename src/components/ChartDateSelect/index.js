import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import Select from 'react-select';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';
import cx from 'classnames';

import './style.css';

const isOutside = (day) => moment(day).isAfter(moment(), 'day')

const SelectOptions = [
  {
    label: 'Last 15 minutes',
    value: 'LAST_15',
  },
  {
    label: 'Last 30 minutes',
    value: 'LAST_30',
  },
  {
    label: 'Last hour',
    value: 'LAST_60',
  },
  {
    label: 'Last 3 hours',
    value: 'LAST_180',
  },
  {
    label: 'Last 12 hours',
    value: 'LAST_720',
  },
  {
    label: 'Last day',
    value: 'LAST_1440',
  },
  {
    label: 'Last week',
    value: 'LAST_10080',
  },
  {
    label: 'Last 30 days',
    value: 'LAST_302400',
  },
  {
    label: 'Custom',
    value: '__CUSTOM__',
  },
]

const ChartDatePicker = ({
  onChange,
  start = moment(),
  end = moment(),
  className=''
}) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  useEffect(() => {
    if (startDate && endDate) {
      const start = startDate.toDate();
      const end = endDate.toDate();
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      onChange({ start, end });
    }
  }, [startDate, endDate]);

  return (
    <div className={cx('chart-date-select-custom--container', className)}>
      <DateRangePicker
        startDate={startDate}
        startDateId={startDate ? String(startDate) : "temp_start_date_id"}
        endDate={endDate}
        endDateId={endDate ? String(endDate) : "temp_end_date_id"}
        onDatesChange={(newDates) => {
          setStartDate(newDates.startDate);
          setEndDate(newDates.endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={isOutside}
      />
    </div>
  )
}

const ChartDateSelect = ({
    onChange,
    start,
    end,
    className,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSelectChange = (option) => {
    if (!option) return;

    if (option.value === '__CUSTOM__') {
      setShowDatePicker(true);
      return;
    } else {
      const minutes = Number(option.value.split('_')[1]);
      const now = new Date();
      onChange({
        start: new Date(+now - (minutes * 60 * 1000)),
        end: now,
      })
    }
  }

  return (
    <div className={cx('chart-date-select--container', className)}>
      <div className="chart-date-select--label">Select time span</div>
      <Select className={cx('chart-date-select--options', className)} options={SelectOptions} onChange={onSelectChange} />
      {showDatePicker && <ChartDatePicker {...{ onChange, start: moment(start), end: moment(end), className }}/>}
    </div>
  )
}


export default ChartDateSelect;
