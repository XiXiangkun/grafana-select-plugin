import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { Select, useStyles2 } from '@grafana/ui';
import { DateTime } from 'luxon';
import './style.css';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

interface Option {
  value: number | string;
  label: string;
}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const [selectedDate, setSelectedDate] = useState('');
  const [indexOption, setIndexOption] = useState(-1);
  const [res, setRes] = useState('');

  let timeArray = data.series[0].fields[0].values.toArray();
  let dataArray = data.series[0].fields[1].values.toArray();
  const dateOptions: Option[] = timeArray.map((timestamp, index) => {
	const dateTimeItem = DateTime.fromMillis(timestamp);
	const formattedTimeStamp = dateTimeItem.toFormat('yyyy-MM-dd HH:mm:ss');
	return {
	  value: timestamp,
	  label: formattedTimeStamp,
	  index: index,
	};
  });
  const onButtonClick = () => {
	setRes(dataArray[indexOption]);
  };

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
        <div className="div_display">
		<span className="span_display">时间</span>
		<Select className="select_display"
		  value={selectedDate}
		  onChange={e => {setSelectedDate(e?.label || ''); setIndexOption(e?.index || 0)}}
		  options={dateOptions}
		  width={30}
		/>
		<button onClick={onButtonClick} className="btn">查询</button>
		</div>
      <div className="result_container">
		{res}
      </div>
    </div>
  );
};
