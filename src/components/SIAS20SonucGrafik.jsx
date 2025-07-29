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

function SIAS20SonucGrafik({ score }) {
  const riskLevel =
    score <= 20
      ? "Düşük Sosyal Anksiyete"
      : score <= 40
      ? "Orta Düzeyde Sosyal Anksiyete"
      : score <= 60
      ? "Yüksek Sosyal Anksiyete"
      : "Çok Yüksek Sosyal Anksiyete";

  const color =
    score <= 20
      ? "#22c55e"
      : score <= 40
      ? "#facc15"
      : score <= 60
      ? "#fb923c"
      : "#ef4444";

  const data = {
    labels: ["Sosyal Anksiyete Skoru"],
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
        max: 80,
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
    <div id="sias-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Tanı için uzman desteği önerilir.
      </p>
    </div>
  );
}

export default SIAS20SonucGrafik;
