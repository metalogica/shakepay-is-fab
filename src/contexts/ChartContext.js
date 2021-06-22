import React, { useState, createContext } from 'react';

export const ChartContext = createContext([{}, () => {}]);

const ChartContextProvider = (props) => {
  const defaultChartState = {
    startDate: '',
    endDate: '',
    data: false
  };

  const [state, setState] = useState(defaultChartState);

  return (
    <ChartContext.Provider value={[state, setState]}>
      {props.children}
    </ChartContext.Provider>
  );
};

export default ChartContextProvider;
