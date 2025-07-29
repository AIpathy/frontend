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

function ICG5SonucGrafik({ score }) {
  const riskLevel =
    score < 5
      ? "Düşük Düzeyde Karmaşık Yas"
      : score < 10
      ? "Orta Düzeyde Karmaşık Yas"
      : "Yüksek Düzeyde Karmaşık Yas";

  const color =
    score < 5
      ? "#22c55e"
      : score < 10
      ? "#facc15"
      : "#ef4444";

  const data = {
    labels: ["Karmaşık Yas Skoru"],
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
        max: 20,
        ticks: { stepSize: 2, color: "#334155", font: { weight: "bold" } },
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
    <div id="icg5-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Tanı için bir uzmana başvurunuz.
      </p>
    </div>
  );
}

export default ICG5SonucGrafik;
