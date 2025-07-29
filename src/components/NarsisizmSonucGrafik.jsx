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

function NarsisizmSonucGrafik({ score }) {
  const riskLevel =
    score <= 25
      ? "Düşük Narsisizm Eğilimi"
      : score <= 50
      ? "Orta Düzeyde Narsisizm Eğilimi"
      : "Yüksek Narsisizm Eğilimi";

  const color =
    score <= 25
      ? "#22c55e"
      : score <= 50
      ? "#facc15"
      : "#ef4444";

  const data = {
    labels: ["Narsisizm Skoru"],
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
        max: 100,
        ticks: { stepSize: 10, color: "#334155", font: { weight: "bold" } },
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
    <div id="narsisizm-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Tanı için profesyonel değerlendirme gerekebilir.
      </p>
    </div>
  );
}

export default NarsisizmSonucGrafik;
