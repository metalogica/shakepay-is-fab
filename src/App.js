import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import ChartWrapper from './containers/Chart';
import Control from './containers/Control';

function App() {
  // TODO: Push start and end date into the chart component
  // const [startDate] = useState(false)
  // const [endDate] = useState(false)

  return (
    <div className="app"> 
      <h2 className="app__header">Net Worth Calculator (CAD)</h2>
      <ChartWrapper/>
      <Control/>
    </div>
  );
}

export default hot(module)(App);
