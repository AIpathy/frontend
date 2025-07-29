import React, { useMemo } from "react";
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

function ToksikIliskiSonucGrafik({ score }) {
  const { level, color } = useMemo(() => {
    if (score <= 13) return { level: "Düşük Toksiklik", color: "#22c55e" };
    if (score <= 26) return { level: "Orta Toksiklik", color: "#eab308" };
    return { level: "Yüksek Toksik İlişki", color: "#dc2626" };
  }, [score]);

  const data = {
    labels: ["Puanınız"],
    datasets: [
      {
        label: "Toksik İlişki",
        data: [score],
        backgroundColor: color,
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
      tooltip: {
        callbacks: {
          label: (ctx) => `Puan: ${ctx.raw}`
        }
      },
      title: {
        display: true,
        text: `Toksik İlişki Seviyeniz: ${level}`,
        font: { size: 20, weight: "bold" },
        color: "#0f172a",
        padding: { top: 10, bottom: 20 }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div id="toksik-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu sonuçlar bilgilendirme amaçlıdır.
      </p>
    </div>
  );
}

export default ToksikIliskiSonucGrafik;
