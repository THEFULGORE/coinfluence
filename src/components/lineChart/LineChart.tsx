import React, { FC } from "react";
import { Line } from "react-chartjs-2";
import { ICoinHistory } from "../../models/IStats";
import {
  Chart as ChartJS,
  Tooltip,
  LineElement,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
} from "chart.js";

ChartJS.register(
  Tooltip,
  LineElement,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

type LineChartProps = {
  coinHistory: ICoinHistory;
  currentPrice: string;
  coinName: string;
};

const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = coinHistory.data.history.length - 1; i > 0; i--) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimeStamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: true,
        backgroundColor: "#ffd7003b",
        borderColor: "gold",
        spanGaps: true,
        pointRadius: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'grey'
        }
      },
      x: {
        grid: {
          color: 'transparent'
        }
      }
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
