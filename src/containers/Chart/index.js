import React, { useState, useContext } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { getNetworthSeries } from './utils';
import { ChartContext } from '../../contexts/ChartContext';

function ChartWrapper() {  
  const [ state ] = useContext(ChartContext);
  console.log(state);
  const [ data, setData ] = useState(false);
  const [ error, setError ] = useState(false);
  
  !data && getNetworthSeries()
    .then(response =>  { 
      setData(response); 
    })
    .catch(error => setError(true));

  return (
    <div className="chart-wrapper">
      {/* Error State */}
      { error && "There was an error with the API request." }

      {/*  Loading State */}
      { !error && !data && "Loading..."}

      {/* Rendered State */}
      { !error && data && (
        <ReactFrappeChart
          type="line"
          colors={["#0894EB"]}
          height={700}
          axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
          data={data}
        />
      )}
    </div>
  );
}

export default ChartWrapper;
