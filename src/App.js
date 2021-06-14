import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import ChartWrapper from './containers/Chart';

function App() {
  return (
    <div className="app">
      <h2 className="app__header">Net Worth Calculator (CAD)</h2>
      <ChartWrapper/>
    </div>
  );
}

export default hot(module)(App);
