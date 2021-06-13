import React from 'react';
import ReactFrappeChart from "react-frappe-charts";

function ChartWrapper() {
  return (
    <div className="chart-wrapper">
      <ReactFrappeChart
        type="line"
        colors={["#21ba45"]}
        height={700}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
        }}
      />
    </div>
  );
}

export default ChartWrapper;
