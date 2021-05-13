import React from "react";
import { Bar } from "react-chartjs-2";

export default function Chart({ labels, datasets }) {
  const chartData = {
    labels,
    datasets,
  };
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          title: {
            display: "Statistics",
          },
          legend: {
            display: true,
            position: "right",
          },
          layout: {
            padding: {
              left: 50,
              right: 0,
              bottom: 0,
              top: 0,
            },
          },
          tooltipls: {
            enabled: true,
          },
        }}
      />
    </div>
  );
}
