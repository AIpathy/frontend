import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Chart.js bileşenlerini kaydet
Chart.register(...registerables);

const MentalHealthChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Eğer önceki chart varsa yok et
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              type: 'bar',
              label: 'Antidepresan Kutu Satışı (Milyon)',
              data: [48, 50, 52, 55, 60, 62.5, 65.6],
              backgroundColor: '#4CAF50',
              borderColor: '#388E3C',
              borderWidth: 1,
              borderRadius: 4,
              borderSkipped: false,
            },
            {
              type: 'line',
              label: 'Psikiyatri Yatak Sayısı (100 Bin Kişi Başına)',
              data: [6.1, 6.1, 6.1, 6.1, 6.1, 6.1, 6.1],
              fill: false,
              borderColor: '#FF5733',
              borderWidth: 3,
              tension: 0.1,
              yAxisID: 'y1',
              pointBackgroundColor: '#FF5733',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6,
              pointHoverRadius: 8,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              beginAtZero: true,
              title: {
                display: true,
                text: 'Antidepresan Kutu Sayısı (Milyon)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
              ticks: {
                color: '#666',
                font: {
                  size: 12
                }
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              beginAtZero: true,
              title: {
                display: true,
                text: 'Psikiyatri Yatak Sayısı (100 Bin Kişi Başına)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              grid: {
                display: false,
              },
              ticks: {
                color: '#666',
                font: {
                  size: 12
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Yıl',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                color: '#666',
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Türkiye\'de Antidepresan Kullanımı ve Psikiyatri Yatak Sayısı (2017-2023)',
              font: {
                size: 18,
                weight: 'bold'
              },
              color: '#333',
              padding: {
                top: 10,
                bottom: 20
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                  size: 12,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#4CAF50',
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y.toFixed(1);
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Ruh Sağlığı İstatistikleri</h3>
            <p className="text-gray-600">Türkiye'de antidepresan kullanımı ve psikiyatri hizmetleri</p>
          </div>
        </div>
      </div>
      
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="text-green-800 font-bold text-lg">65.6M</div>
          <div className="text-green-600 text-sm">2023 Antidepresan Kutu</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <div className="text-orange-800 font-bold text-lg">%36.7</div>
          <div className="text-orange-600 text-sm">2017-2023 Artış</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="text-blue-800 font-bold text-lg">6.1</div>
          <div className="text-blue-600 text-sm">Psikiyatri Yatak/100K</div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthChart; 