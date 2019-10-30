import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

const isOutside = (day) => moment(day).isAfter(moment(), 'day')


const ChartDateSelect = ({
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
    <div className={className}>
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

export default ChartDateSelect;
