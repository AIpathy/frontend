import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function PCL5SonucGrafik({ score }) {
  const riskLevel =
    score <= 10
      ? "Düşük TSSB Belirtisi"
      : score <= 20
      ? "Orta Düzeyde TSSB Belirtisi"
      : score <= 30
      ? "Yüksek TSSB Belirtisi"
      : "Çok Yüksek TSSB Belirtisi";

  const color =
    score <= 10
      ? "#22c55e"
      : score <= 20
      ? "#facc15"
      : score <= 30
      ? "#fb923c"
      : "#ef4444";

  const data = {
    labels: ["TSSB Skoru"],
    datasets: [
      {
        label: "Puan",
        data: [score],
        backgroundColor: [color],
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: 40,
        ticks: { stepSize: 5, color: "#334155", font: { weight: "bold" } },
        grid: { color: "#e2e8f0" }
      },
      y: {
        ticks: { color: "#334155", font: { weight: "bold" } },
        grid: { color: "#e2e8f0" }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `Puan: ${ctx.raw}` } },
      title: {
        display: true,
        text: `Değerlendirme: ${riskLevel}`,
        font: { size: 20, weight: "bold" },
        color: "#0f172a",
        padding: { top: 10, bottom: 20 }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div id="pcl5-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Tanı için uzmanla görüşmeniz önerilir.
      </p>
    </div>
  );
}

export default PCL5SonucGrafik;
