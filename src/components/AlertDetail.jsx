import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../services/api";
import { ArrowLeft } from "lucide-react";

function AlertDetail() {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const [alert, setAlert]   = useState(null);
  const [loading, setLoading]= useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const token = localStorage.getItem("token");
        const data  = await ApiService.getAlert(id, token);
        setAlert(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlert();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-400">Yükleniyor…</div>;
  if (error)   return <div className="p-8 text-red-400">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-green-700 flex justify-center pt-20">
      <div className="bg-[#232325] text-white rounded-xl p-8 w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#265d5c] mb-4 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Geri
        </button>

        <h2 className="text-2xl font-bold mb-4">{alert.title || "Uyarı Detayı"}</h2>

        <p className="mb-2"><span className="font-semibold">Hasta:</span> {alert.patient_name}</p>
        <p className="mb-2"><span className="font-semibold">Tür:</span> {alert.type}</p>
        <p className="mb-2"><span className="font-semibold">Tarih:</span> {new Date(alert.created_at).toLocaleString("tr-TR")}</p>
        <p className="mt-4">{alert.message}</p>
      </div>
    </div>
  );
}

export default AlertDetail;
