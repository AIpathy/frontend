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

function TerkEdilmeSonucGrafik({ score }) {
  let riskLevel = "";
  let color = "";

  if (score <= 14) {
    riskLevel = "Düşük Terk Edilme Kaygısı";
    color = "#22c55e"; // yeşil
  } else if (score <= 28) {
    riskLevel = "Orta Terk Edilme Kaygısı";
    color = "#facc15"; // sarı
  } else {
    riskLevel = "Yüksek Terk Edilme Kaygısı";
    color = "#ef4444"; // kırmızı
  }

  const data = {
    labels: ["Terk Edilme Skoru"],
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
        max: 45,
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
        text: `Risk Seviyesi: ${riskLevel}`,
        font: { size: 20, weight: "bold" },
        color: "#0f172a",
        padding: { top: 10, bottom: 20 }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div id="terkedilme-grafik" className="mt-6 space-y-4">
      <div className="h-[250px]">
        <Bar data={data} options={options} />
      </div>
      <p className="text-sm text-gray-600 text-center mt-2 italic">
        * Bu test bilgilendirme amaçlıdır. Klinik tanı için uzman desteği alınmalıdır.
      </p>
    </div>
  );
}

export default TerkEdilmeSonucGrafik;
