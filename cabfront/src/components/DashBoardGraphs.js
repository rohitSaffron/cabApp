import React from "react";
import Chart from "react-apexcharts";
import PieChart from "./PieChart";

const DashBoardGraphs = () => {
  const barState = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: ["OCt", 'Nov', 'DEC', "Jan"],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50],
      },
    ],
  };

  return (
    <div className="data__graphs">
      <div className="data__row">
        <div className="data__chart">
          <Chart
            options={barState.options}
            series={barState.series}
            type="bar"
            width="500"
          />
        </div>

        <div className="data__chart">
          <PieChart />
        </div>
      </div>

     
    </div>
  );
};

export default DashBoardGraphs;
