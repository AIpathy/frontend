import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

export default function OKBSonucGrafik({ score }) {
  const { color, label } = useMemo(() => {
    if (score <= 13) return { color: "#22c55e", label: "Düşük OKB Belirtisi" };
    if (score <= 26) return { color: "#eab308", label: "Orta Düzey OKB Belirtisi" };
    return { color: "#dc2626", label: "Yüksek OKB Belirtisi" };
  }, [score]);

  const data = {
    labels: ["OKB Skoru"],
    datasets: [
      {
        label,
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
        min: 0,
        max: 40
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${label}: ${ctx.raw}`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="mt-6 h-40">
      <Bar data={data} options={options} />
      <p className="text-sm text-center mt-4 text-gray-600">
        * Bu test yalnızca bilgilendirme amaçlıdır.
      </p>
    </div>
  );
}
