import React, { useState } from 'react';
import ReactFrappeChart from "react-frappe-charts";
import { getNetworthSeries } from './utils';
import Logo from '../../logo.svg';

function ChartWrapper() {  
  const [ data, setData ] = useState(false);
  const [ error, setError ] = useState(false);
  
  getNetworthSeries()
    .then(response => setData(response))
    .catch(error => setError(true));

  return (
    <div className="chart-wrapper">
      {/* Error State */}
      { error && "There was an error with the API request." }
      {/*  Loading State */}
      { error && !data && <Logo/>}
      {/* Rendered State */}
      { !error && data && (
        <ReactFrappeChart
          type="line"
          colors={["#21ba45"]}
          height={700}
          axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
          data={data}
        />
      )}
    </div>
  );
}

export default ChartWrapper;
