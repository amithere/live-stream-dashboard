import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Registering the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LiveStreamChart = ({ chartData }) => {

  // Prepare the chart data
  const data = {
    labels: chartData.map((item) => {

        const parsedData = JSON.parse(item.wikiEventData); 
        // Ensure the timestamp exists and is valid
        if (parsedData.timestamp) {
          return new Date(parsedData.timestamp * 1000).toLocaleTimeString();
        }
        return 'Invalid Timestamp'; // Fallback in case timestamp is missing
      }),
    datasets: [
      {
        label: "Revisions Length",
        data: chartData.map((item) => {
            // Parse the wiki_event_data string into an object
            const parsedData = JSON.parse(item.wikiEventData); 
            
            // Access the 'new' property inside the parsed data, and handle missing length field gracefully
            return parsedData.length ? parsedData.length.new : 0; // Default to 0 if length is missing
          }),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options (optional, can be customized)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Length: ${tooltipItem.raw}`, // Customize tooltips
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        title: {
          display: true,
          text: "Length (New)",
        },
        beginAtZero: true,
      },
    },
  };

  return <div className="main-content">
    <Line data={data} options={options} />
  </div>
};

export default LiveStreamChart;
