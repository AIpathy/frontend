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

export default function DikkatSonucGrafik({ score }) {
  const { color, label } = useMemo(() => {
    if (score <= 10) return { color: "#22c55e", label: "Düşük Dikkat Eksikliği" };
    if (score <= 20) return { color: "#eab308", label: "Orta Dikkat Eksikliği" };
    return { color: "#dc2626", label: "Yüksek Dikkat Eksikliği" };
  }, [score]);

  const data = {
    labels: ["Dikkat Skoru"],
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
        max: 30 // Toplam maksimum puana göre ayarlandı (10 soru x 3)
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `${label}: ${context.raw}`
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
        * Bu test bilgilendirme amaçlıdır. Klinik tanı için uzman desteği alınmalıdır.
      </p>
    </div>
  );
}
