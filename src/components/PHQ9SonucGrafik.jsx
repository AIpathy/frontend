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

function PHQ9SonucGrafik({ score }) {
  const riskLevel =
    score <= 4
      ? "Minimal Depresyon"
      : score <= 9
      ? "Hafif Depresyon"
      : score <= 14
      ? "Orta Düzeyde Depresyon"
      : score <= 19
      ? "Orta-Şiddetli Depresyon"
      : "Şiddetli Depresyon";

  const color =
    score <= 4
      ? "#22c55e"
      : score <= 9
      ? "#facc15"
      : score <= 14
      ? "#fb923c"
      : score <= 19
      ? "#f97316"
      : "#ef4444";

  const data = {
    labels: ["PHQ-9 Depresyon Skoru"],
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
        max: 27,
        ticks: { stepSize: 3, color: "#334155", font: { weight: "bold" } },
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
    <div id="phq9-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Tanı için profesyonel destek almanız önerilir.
      </p>
    </div>
  );
}

export default PHQ9SonucGrafik;
