import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import ChartWrapper from './containers/Chart';

function App() {
  return (
    <div className="app">
      <h2>Net Worth Calculator: April 2020 to Dec 2020</h2>
      <ChartWrapper/>
    </div>
  );
}

export default hot(module)(App);
