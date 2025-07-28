import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Send, RotateCcw, Volume2 } from "lucide-react";

function VoiceRecorder({ isRecording, onSendAudio, onPermissionChange, autoStart = false }) {
  // Ses kaydı state'leri
  const [isRecordingActive, setIsRecordingActive] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);

  // Refs
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const recordingIntervalRef = useRef(null);
  const currentBlobURL = useRef(null);

  // Cleanup
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      // URL cleanup sadece component unmount'ta
      if (currentBlobURL.current) {
        URL.revokeObjectURL(currentBlobURL.current);
        currentBlobURL.current = null;
      }
    };
  }, []);

  // isRecording prop'u değiştiğinde medya stream'i yönet
  useEffect(() => {
    if (isRecording && !mediaStreamRef.current) {
      requestMediaAccess();
    } else if (!isRecording && mediaStreamRef.current) {
      cleanup();
    }
  }, [isRecording]);

  // Auto start özelliği
  useEffect(() => {
    if (autoStart && isRecording && mediaStreamRef.current && !isRecordingActive) {
      // Kısa bir gecikme ekleyerek medya stream'in hazır olmasını sağlayalım
      setTimeout(() => {
        toggleRecording();
      }, 500);
    }
  }, [autoStart, isRecording, mediaStreamRef.current]);

  // Medya erişimi iste
  const requestMediaAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      onPermissionChange?.(true);
    } catch (error) {
      console.error('Media access error:', error);
      onPermissionChange?.(false);
    }
  };

  // Güvenli blob URL temizleme
  const cleanupBlobURL = () => {
    if (currentBlobURL.current) {
      // Audio element kullanımda değilse URL'yi temizle
      setTimeout(() => {
        if (currentBlobURL.current) {
          URL.revokeObjectURL(currentBlobURL.current);
          currentBlobURL.current = null;
        }
      }, 100);
    }
  };

  // Temizlik
  const cleanup = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && isRecordingActive) {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecordingActive(false);
    setRecordingDuration(0);
    setAudioURL(null);
    setRecordedChunks([]);
    stopDurationCounter();
    
    // Blob URL temizleme işlemini geciktirelim
    cleanupBlobURL();
  };

  // Süre sayacı fonksiyonları
  const startDurationCounter = () => {
    setRecordingDuration(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopDurationCounter = () => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
  };

  // Süreyi formatla
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // MediaRecorder için en uygun MIME type'ı bul
  const getSupportedMimeType = () => {
    const types = [
      'audio/mpeg', // MP3 format
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/wav'
    ];
    
    return types.find(type => MediaRecorder.isTypeSupported(type)) || 'audio/webm';
  };

  // Blob'u Data URL'ye çevir (WebKit uyumluluğu için)
  const blobToDataURL = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  // Ana kayıt toggle fonksiyonu
  const toggleRecording = async () => {
    if (!isRecordingActive) {
      // Kaydı başlat
      if (!mediaStreamRef.current) return;

      try {
        const mimeType = getSupportedMimeType();
        const mediaRecorder = new MediaRecorder(mediaStreamRef.current, {
          mimeType: mimeType
        });
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const blob = new Blob(chunks, { type: mimeType });
          
          // Eski URL'yi temizle
          if (currentBlobURL.current) {
            URL.revokeObjectURL(currentBlobURL.current);
          }
          
          // Data URL kullan (WebKit uyumluluğu için)
          try {
            const dataURL = await blobToDataURL(blob);
            setAudioURL(dataURL);
            currentBlobURL.current = null; // Data URL kullanıyoruz, blob URL değil
          } catch (error) {
            console.error('Data URL conversion error:', error);
            // Fallback olarak blob URL kullan
            const url = URL.createObjectURL(blob);
            setAudioURL(url);
            currentBlobURL.current = url;
          }
          
          setRecordedChunks(chunks);
        };

        mediaRecorder.start();
        setIsRecordingActive(true);
        startDurationCounter();
      } catch (error) {
        console.error('Recording start error:', error);
      }
    } else {
      // Kaydı durdur
      if (mediaRecorderRef.current && isRecordingActive) {
        mediaRecorderRef.current.stop();
        setIsRecordingActive(false);
        stopDurationCounter();
      }
    }
  };

  // Audio player'ın yüklenmesini sağla
  useEffect(() => {
    if (audioURL && audioPlayerRef.current) {
      // Data URL ise direkt yükle
      if (audioURL.startsWith('data:')) {
        audioPlayerRef.current.load();
      }
    }
  }, [audioURL]);

  // Kayıtlı sesi oynat/durdur
  const togglePlayback = async () => {
    if (!audioPlayerRef.current || !audioURL) return;

    try {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        // Play promise'ini bekle
        await audioPlayerRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  // Ses kaydını gönder
  const sendAudioRecording = async () => {
    if (!recordedChunks.length) return;

    const mimeType = getSupportedMimeType();
    const blob = new Blob(recordedChunks, { type: mimeType });
    
    // Ses verilerini parent component'e gönder
    onSendAudio?.({
      blob,
      audioURL,
      duration: recordingDuration,
      formattedDuration: formatDuration(recordingDuration)
    });

    // Kayıt durumunu sıfırla
    resetRecording();
  };

  // Kaydı sıfırla
  const resetRecording = () => {
    if (mediaRecorderRef.current && isRecordingActive) {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecordingActive(false);
    setRecordingDuration(0);
    setAudioURL(null);
    setRecordedChunks([]);
    stopDurationCounter();
    
    // Blob URL temizleme
    cleanupBlobURL();
  };

  // Component görünür değilse render etme
  if (!isRecording) {
    return null;
  }

  return (
    <div>
      {/* Kompakt Ses Kontrol Barı */}
      <div className="border-t border-[#3CB97F]/20 bg-white/95 p-3">
        <div className="flex items-center space-x-3">
          {/* Ana Kayıt Butonu */}
          <button
            onClick={toggleRecording}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isRecordingActive
                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                : 'bg-[#3CB97F] hover:bg-[#2d8f5f]'
            } text-white shadow-lg hover:shadow-xl`}
          >
            {isRecordingActive ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Durum ve Süre Bilgisi */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {isRecordingActive ? 'Kayıt yapılıyor...' : audioURL ? 'Kayıt hazır' : 'Ses kaydı'}
              </span>
              {recordingDuration > 0 && (
                <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {formatDuration(recordingDuration)}
                </span>
              )}
            </div>
            
            {/* Ses Wave Animasyonu (sadece kayıt sırasında) */}
            {isRecordingActive && (
              <div className="flex items-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 rounded animate-pulse"
                    style={{
                      height: Math.random() * 12 + 4 + 'px',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* İkincil Butonlar */}
          {audioURL && !isRecordingActive && (
            <div className="flex items-center space-x-2">
              {/* Dinle */}
              <button
                onClick={togglePlayback}
                className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                title="Dinle"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Sil */}
              <button
                onClick={resetRecording}
                className="p-2 text-orange-500 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                title="Sil"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Gönder */}
              <button
                onClick={sendAudioRecording}
                className="px-4 py-2 bg-[#3CB97F] hover:bg-[#2d8f5f] text-white rounded-lg flex items-center space-x-1 transition-colors text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Gönder</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gizli Audio Player */}
      {audioURL && (
        <audio
          ref={audioPlayerRef}
          src={audioURL}
          preload="metadata"
          onEnded={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Audio error:', e);
            setIsPlaying(false);
          }}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}

export default VoiceRecorder; 