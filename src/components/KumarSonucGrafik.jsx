import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function KumarSonucGrafik({ score }) {
  const { riskLevel, color } = useMemo(() => {
    if (score < 5) return { riskLevel: "Düşük Risk", color: "#3CB97F" };
    if (score < 9.5) return { riskLevel: "Orta Risk", color: "#facc15" };
    return { riskLevel: "Yüksek Risk", color: "#f43f5e" };
  }, [score]);

  const data = {
    labels: ["Kumar Riski"],
    datasets: [
      {
        label: riskLevel,
        data: [score],
        backgroundColor: color,
        borderRadius: 8,
        barThickness: 60,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: 20,
        ticks: { stepSize: 2 },
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#374151",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-6" style={{ height: "200px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
