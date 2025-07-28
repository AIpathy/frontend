import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send, Bot, Smile, SendHorizontal } from "lucide-react";
import Button from "./Button";

function AIInteraction({ doctorMode = false }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [permissions, setPermissions] = useState({
    audio: false
  });
  const [messages, setMessages] = useState(() => {
    // localStorage'dan konuşmaları yükle
    const savedMessages = localStorage.getItem('aiChatMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      // Timestamp'leri Date objesine çevir
      return parsedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    // İlk kez açılıyorsa varsayılan mesajları göster
    if (doctorMode) {
      return [
        {
          id: 1,
          type: 'ai',
          content: 'Merhaba! Bugün sizin psikolojik iyi oluşunuzu analiz etmek için buradayım. Ses analiziyle ruh halinizi değerlendirebilirim.',
          timestamp: new Date()
        },
        {
          id: 2,
          type: 'ai',
          content: 'Kendi ruh halinizi analiz etmem için ses verilerinizi kullanmama izin veriyor musunuz? Böylece size daha iyi destek olabilirim.',
          timestamp: new Date(),
          showConsentButton: true
        }
      ];
    }
    return [
      {
        id: 1,
        type: 'ai',
        content: 'Merhaba! Psikolojik durumunuzu analiz etmek için buradayım. Ses analizi yaparak size daha iyi yardımcı olabilirim.',
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'ai',
        content: 'Sesinizin analiz edilmesine izin veriyor musunuz? Bu sayede konuşmanızı analiz ederek size daha iyi yardımcı olabilirim.',
        timestamp: new Date(),
        showConsentButton: true
      }
    ];
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const mediaStreamRef = useRef(null);
  const chatContainerRef = useRef(null);

  // İzinleri kontrol et
  useEffect(() => {
    checkPermissions();
  }, []);

  // Mesajları localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('aiChatMessages', JSON.stringify(messages));
  }, [messages]);

  // Sohbet alanını en alta kaydır
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const checkPermissions = async () => {
    try {
      // Ses izni kontrolü
      const audioPermission = await navigator.permissions.query({ name: 'microphone' });
      setPermissions(prev => ({ ...prev, audio: audioPermission.state === 'granted' }));
    } catch (error) {
      console.log('Permission check failed:', error);
    }
  };

  // Kullanıcı onayını al ve medya akışını başlat
  const handleConsent = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      mediaStreamRef.current = stream;

      setPermissions({ audio: true });
      setIsRecording(true);
      // Onay mesajını ekle
      const consentMessage = {
        id: messages.length + 1,
        type: 'user',
        content: doctorMode
          ? 'Evet, kendi psikolojik analizim için ses verilerimi kullanabilirsin.'
          : 'Evet, ses analizi yapılmasına izin veriyorum.',
        timestamp: new Date()
      };
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: doctorMode
          ? 'Teşekkürler! Artık kendi ruh halinizi analiz edebilirim. Dilediğiniz gibi konuşmaya başlayabilirsiniz.'
          : 'Teşekkürler! Artık ses analizi yapabilirim. Konuşmaya başlayabilirsiniz.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, consentMessage, aiResponse]);
    } catch (error) {
      console.error('Media stream error:', error);
      // Hata mesajını ekle
      const errorMessage = {
        id: messages.length + 1,
        type: 'user',
        content: doctorMode
          ? 'Hayır, şu an kendi psikolojik analizimi yapmak istemiyorum.'
          : 'Hayır, şu an izin vermek istemiyorum.',
        timestamp: new Date()
      };
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: doctorMode
          ? 'Anladım. Sadece metin tabanlı sohbet yapabiliriz. Size nasıl yardımcı olabilirim?'
          : 'Anlıyorum. Sadece metin tabanlı sohbet yapabiliriz. Size nasıl yardımcı olabilirim?',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage, aiResponse]);
    }
  };

  // Medya akışını başlat
  const startMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      mediaStreamRef.current = stream;

      setPermissions({ audio: true });
      setIsRecording(true);
    } catch (error) {
      console.error('Media stream error:', error);
      alert('Mikrofon erişimi gerekli!');
    }
  };

  // Medya akışını durdur
  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);
  };

  // Mute toggle
  const toggleMute = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!isMuted);
      }
    }
  };

  // Mesaj gönder
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
    // AI yanıtını simüle et
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: doctorMode
          ? 'Mesajınızı aldım. Ses analizinizle birlikte ruh halinizi değerlendiriyorum...'
          : 'Mesajınızı aldım. Ses analizinizle birlikte değerlendiriyorum...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  // Enter tuşu ile mesaj gönder
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  // Input değişikliklerini takip et
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputMessage(value);
    setIsTyping(value.length > 0);
    
    // Mesaj uzunluğuna göre textarea yüksekliğini ayarla
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + 'px';
  };

  // Emoji ekle
  const addEmoji = (emoji) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Yeni konuşma başlat
  const startNewConversation = () => {
    let newMessages;
    if (doctorMode) {
      newMessages = [
        {
          id: 1,
          type: 'ai',
          content: 'Merhaba! Bugün sizin psikolojik iyi oluşunuzu analiz etmek için buradayım. Ses analiziyle ruh halinizi değerlendirebilirim.',
          timestamp: new Date()
        },
        {
          id: 2,
          type: 'ai',
          content: 'Kendi ruh halinizi analiz etmem için ses verilerinizi kullanmama izin veriyor musunuz? Böylece size daha iyi destek olabilirim.',
          timestamp: new Date(),
          showConsentButton: true
        }
      ];
    } else {
      newMessages = [
      {
        id: 1,
        type: 'ai',
        content: 'Merhaba! Psikolojik durumunuzu analiz etmek için buradayım. Ses analizi yaparak size daha iyi yardımcı olabilirim.',
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'ai',
        content: 'Sesinizin analiz edilmesine izin veriyor musunuz? Bu sayede konuşmanızı analiz ederek size daha iyi yardımcı olabilirim.',
        timestamp: new Date(),
        showConsentButton: true
      }
    ];
    }
    setMessages(newMessages);
    // Medya akışını durdur
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsRecording(false);
    setPermissions({ audio: false });
  };

  return (
    <div className="h-full relative z-0">
      <div
        className="rounded-xl border border-[#3CB97F]/20 overflow-hidden h-full flex flex-col"
        style={{ background: 'linear-gradient(135deg, #f5faff 60%, #e0e7ef 100%)' }}
      >
        {/* Header */}
        <div className="bg-white/90 border-b border-[#3CB97F]/20 p-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#3CB97F] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {doctorMode ? 'AI Klinik Asistan' : 'AI Psikolojik Asistan'}
                </h1>
                <p className="text-gray-500 text-sm">
                  {doctorMode
                    ? 'Doktorlara özel psikolojik destek'
                    : 'Ses analizi ile ruh halinizi analiz ediyorum'}
                </p>
              </div>
            </div>
            
            {/* Kontrol Butonları */}
            <div className="flex items-center space-x-3">
              <button
                onClick={startNewConversation}
                className="p-2 text-gray-400 hover:text-[#3CB97F] transition-colors rounded-lg hover:bg-[#18181b]/50"
                title="Yeni Konuşma"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              {isRecording && (
                <>
                  <button
                    onClick={toggleMute}
                    className={`p-3 rounded-lg transition-colors ${
                      isMuted 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'bg-[#3CB97F]/20 text-[#3CB97F] border border-[#3CB97F]/30'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  
                  <Button onClick={stopMediaStream}>
                    Durdur
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ana İçerik - Sadece Sohbet Alanı */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mesajlar */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
                    message.type === 'user'
                      ? 'bg-[#3CB97F] text-white'
                      : 'bg-white/80 text-gray-800 border border-[#3CB97F]/10'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  
                  {/* Onay Butonları */}
                  {message.showConsentButton && (
                    <div className="mt-3 space-y-2">
                      <button
                        onClick={handleConsent}
                        className="w-full bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Evet, ses analizi yapılmasına izin veriyorum
                      </button>
                      <button
                        onClick={() => {
                          const declineMessage = {
                            id: messages.length + 1,
                            type: 'user',
                            content: 'Hayır, şu an izin vermek istemiyorum.',
                            timestamp: new Date()
                          };
                          
                          const aiResponse = {
                            id: messages.length + 2,
                            type: 'ai',
                            content: 'Anlıyorum. Sadece metin tabanlı sohbet yapabiliriz. Size nasıl yardımcı olabilirim?',
                            timestamp: new Date()
                          };
                          
                          setMessages(prev => [...prev, declineMessage, aiResponse]);
                        }}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        Hayır, sadece metin tabanlı sohbet yapalım
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#18181b]/50 text-gray-300 border border-[#3CB97F]/20 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3CB97F]"></div>
                    <span className="text-sm">AI düşünüyor...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modern Mesaj Girişi */}
          <div className="p-4 border-t border-[#3CB97F]/20 bg-white/80 flex-shrink-0">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                {/* Emoji Butonu - yukarı hizalı */}
              <button
                  type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="absolute left-3 top-2 p-2 text-gray-400 hover:text-[#3CB97F] transition-colors rounded-lg hover:bg-gray-100"
                title="Emoji ekle"
                  style={{ zIndex: 2 }}
              >
                <Smile className="w-5 h-5" />
              </button>
                <textarea
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın... (Enter ile gönder)"
                  className="w-full bg-white/90 text-gray-800 placeholder-gray-400 rounded-xl pl-12 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-[#3CB97F]/50 border-2 border-[#3CB97F]/10 hover:border-[#3CB97F]/30 transition-all duration-200 min-h-[44px] max-h-32 text-sm"
                  rows="1"
                  style={{ minHeight: '44px', maxHeight: '128px', overflowY: 'auto' }}
                />
                
                {/* Karakter Sayacı */}
                {isTyping && (
                  <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                    {inputMessage.length}/1000
                  </div>
                )}
              </div>

              {/* Gönder Butonu */}
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-[#3CB97F] hover:bg-[#2d8f5f] text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-20 left-4 bg-[#232325] border border-[#3CB97F]/20 rounded-lg p-3 shadow-xl z-[9999]">
                <div className="grid grid-cols-8 gap-2">
                  {['😊', '😂', '❤️', '👍', '🎉', '🔥', '😎', '🤔', '😢', '😡', '😴', '🤗', '👋', '💪', '🎯', '✨'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => addEmoji(emoji)}
                      className="p-2 hover:bg-[#18181b]/50 rounded-lg transition-colors text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Yazıyor Göstergesi */}
            {isTyping && (
              <div className="mt-2 text-xs text-gray-400 flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Yazıyor...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInteraction; 