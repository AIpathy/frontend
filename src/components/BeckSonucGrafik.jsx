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

function BeckSonucGrafik({ score }) {
  const riskLevel =
    score <= 7
      ? "Minimal / Yok"
      : score <= 15
      ? "Hafif Anksiyete"
      : score <= 25
      ? "Orta Düzeyde Anksiyete"
      : "Ciddi Düzeyde Anksiyete";

  const color =
    score <= 7
      ? "#22c55e" // yeşil
      : score <= 15
      ? "#facc15" // sarı
      : score <= 25
      ? "#fb923c" // turuncu
      : "#ef4444"; // kırmızı

  const data = {
    labels: ["Anksiyete Puanı"],
    datasets: [
      {
        label: "Beck Anksiyete Skoru",
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
        max: 60,
        ticks: {
          stepSize: 5,
          color: "#334155",
          font: { weight: "bold" }
        },
        grid: { color: "#e2e8f0" }
      },
      y: {
        ticks: { color: "#334155", font: { weight: "bold" } },
        grid: { color: "#e2e8f0" }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Puan: ${ctx.raw}`
        }
      },
      title: {
        display: true,
        text: `Anksiyete Seviyesi: ${riskLevel}`,
        font: { size: 20, weight: "bold" },
        color: "#0f172a",
        padding: { top: 10, bottom: 20 }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div id="beck-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Klinik tanı için uzman desteği alınmalıdır.
      </p>
    </div>
  );
}

export default BeckSonucGrafik;
