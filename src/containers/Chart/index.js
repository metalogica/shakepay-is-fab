import React, { useState, useContext } from 'react';
import ReactFrappeChart from 'react-frappe-charts';
import { usePrevious } from '../../hooks';
import { getNetworthSeries } from './utils';
import { ChartContext } from '../../contexts/ChartContext';

function ChartWrapper() {  
  const [ state, setState ] = useContext(ChartContext);
  const { startDate, endDate, data } = state;
  const [ error, setError ] = useState(false);

  const prevState = usePrevious(state) || {};
  const dateChange = (prevState.startDate !== startDate || prevState.endDate !== endDate);
  const initialLoad = ((startDate === '' && endDate === '') && !data);
  console.log(prevState, state);
  console.log('date change: ', dateChange, 'initialLoad: ', initialLoad);
  console.log('shoudl re-render: ', (dateChange || initialLoad));
  
  (dateChange || initialLoad) && getNetworthSeries(startDate, endDate)
    .then(response =>  setState({...state, data: response}))
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
