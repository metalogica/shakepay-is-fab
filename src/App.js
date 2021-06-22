import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import ChartContextProvider from './contexts/ChartContext';
import ChartWrapper from './containers/Chart';
import Control from './containers/Control';

// const ChartContext = React.createContext([{}, () => {}]);

function App() {
  // TODO: Push start and end date into the chart component
  // const [startDate] = useState(false)
  // const [endDate] = useState(false)
  // const [chartContext, setChartcontext] = useState(...)

  return (
    <div className="app"> 
      <h2 className="app__header">Net Worth Calculator (CAD)</h2>
      <ChartContextProvider>
        <ChartWrapper/>
        <Control/>
      </ChartContextProvider>
    </div>
  );
}

export default hot(module)(App);
