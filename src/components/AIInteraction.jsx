import React, { useState, useRef, useEffect } from "react";
import { Bot, SendHorizontal } from "lucide-react";
import Button from "./Button";
import VoiceRecorder from "./VoiceRecorder";
import ApiService from "../services/api";
import { useAuth } from "../hooks/useAuth";

function AIInteraction({ doctorMode = false }) {
  const { token } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [permissions, setPermissions] = useState({
    audio: false
  });
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Merhaba! Psikolojik durumunuzu analiz etmek için buradayım. Ses analizi yaparak size daha iyi yardımcı olabilirim.',
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'ai',
      content: 'Sesinizin analiz edilmesine izin veriyor musunuz? Bu sayede konuşmanızı analiz ederek size daha iyi yardımcı olabilirim. Veya metin mesajı göndererek de sohbet edebiliriz.',
      timestamp: new Date(),
      showConsentButton: true
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);

  // İzinleri kontrol et
  useEffect(() => {
    checkPermissions();
  }, []);

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

  // Kullanıcı onayını al
  const handleConsent = async () => {
    setIsRecording(true);
    
    // Onay mesajını ekle
    const consentMessage = {
      id: messages.length + 1,
      type: 'user',
      content: 'Evet, ses analizi yapılmasına izin veriyorum.',
      timestamp: new Date()
    };
    const aiResponse = {
      id: messages.length + 2,
      type: 'ai',
      content: 'Teşekkürler! Artık ses kaydı yapabilirsiniz. Aşağıdaki mikrofon butonuna basarak konuşmaya başlayabilirsiniz.',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, consentMessage, aiResponse]);
  };

  // VoiceRecorder'dan gelen ses verilerini işle
  const handleSendAudio = async (audioData) => {
    // Kullanıcı mesajını ekle
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: `🎵 Ses kaydı gönderildi (${audioData.formattedDuration})`,
      timestamp: new Date(),
      audioData: audioData.audioURL
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Audio verilerini backend'e gönder
      const response = await ApiService.submitVoiceAnalysis(audioData, token);
      
      console.log('Voice analysis response:', response);
      console.log('Analysis fields:', {
        transcription: response.analysis?.transcription,
        emotion_analysis: response.analysis?.emotion_analysis,
        ai_comment: response.analysis?.ai_comment
      });
      
      // Gemini analizini göster (ai_comment veya emotion_analysis), yoksa transcription
      const aiContent = response.analysis?.ai_comment || 
                       response.analysis?.emotion_analysis || 
                       response.analysis?.transcription || 
                       'Ses analizi tamamlandı.';
      
      console.log('Selected AI content:', aiContent);
      console.log('Full analysis response:', response.analysis);
      
      // Eğer Gemini analizi yoksa kullanıcıya bilgi ver
      if (!response.analysis?.ai_comment && !response.analysis?.emotion_analysis) {
        console.warn('Gemini analysis not available, showing transcription only');
      }
      
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: aiContent,
        timestamp: new Date(),
        analysisId: response.analysis.id
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Voice analysis error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Ses analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // VoiceRecorder'dan gelen izin durumunu işle
  const handlePermissionChange = (hasPermission) => {
    setPermissions(prev => ({ ...prev, audio: hasPermission }));
    if (!hasPermission) {
      // İzin reddedildi, metin tabanlı sohbeti aktif hale getir
      const errorMessage = {
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
      setMessages(prev => [...prev, errorMessage, aiResponse]);
      
      // Metin tabanlı sohbeti aktif hale getir
      setIsRecording(false); // Ses kaydını kapat
    }
  };

  // Oturumu sonlandır
  const stopMediaStream = () => {
    setIsRecording(false);
    setPermissions({ audio: false });
  };

  // Mesaj gönder
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Emoji dönüşümünü uygula
    const convertedMessage = convertTextToEmoji(inputMessage);
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: convertedMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    try {
      // Text mesajı için AI yanıtı al
      const response = await ApiService.sendTextMessage(inputMessage, token);
      
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: response.message || 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Text message error:', error);
      const errorMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Mesajınızı işlerken bir hata oluştu. Lütfen tekrar deneyin.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
    
    // Emoji dönüşümünü gerçek zamanlı uygula
    const convertedValue = convertTextToEmoji(value);
    if (convertedValue !== value) {
      // Cursor pozisyonunu kaydet
      const cursorPosition = e.target.selectionStart;
      const cursorEnd = e.target.selectionEnd;
      
      // Textarea'yı güncelle
      e.target.value = convertedValue;
      setInputMessage(convertedValue);
      
      // Cursor pozisyonunu geri yükle (emoji dönüşümünden sonra)
      setTimeout(() => {
        e.target.setSelectionRange(cursorPosition, cursorEnd);
      }, 0);
    }
    
    // Mesaj uzunluğuna göre textarea yüksekliğini ayarla
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
  };

  // Otomatik emoji dönüşümü
  const convertTextToEmoji = (text) => {
    const emojiMap = {
      ':)': '😊',
      ':-)': '😊',
      ':(': '😢',
      ':-(': '😢',
      ';)': '😉',
      ';-)': '😉',
      ':D': '😃',
      ':-D': '😃',
      ':P': '😛',
      ':-P': '😛',
      ':p': '😛',
      ':-p': '😛',
      'xD': '😆',
      'XD': '😆',
      'x)': '😆',
      'X)': '😆',
      ':|': '😐',
      ':-|': '😐',
      ':O': '😮',
      ':-O': '😮',
      ':o': '😮',
      ':-o': '😮',
      ':*': '😘',
      ':-*': '😘',
      '<3': '❤️',
      '</3': '💔',
      ':heart:': '❤️',
      ':love:': '❤️',
      ':thumbsup:': '👍',
      ':thumbsdown:': '👎',
      ':ok:': '👌',
      ':fire:': '🔥',
      ':star:': '⭐',
      ':sparkles:': '✨',
      ':clap:': '👏',
      ':wave:': '👋',
      ':pray:': '🙏',
      ':thinking:': '🤔',
      ':sunglasses:': '😎',
      ':crown:': '👑',
      ':rocket:': '🚀',
      ':tada:': '🎉',
      ':muscle:': '💪',
      ':brain:': '🧠',
      ':heart_eyes:': '😍',
      ':joy:': '😂',
      ':sob:': '😭',
      ':rage:': '😡',
      ':sleepy:': '😴',
      ':hug:': '🤗',
      ':high_five:': '🙌',
      ':peace:': '✌️',
      ':v:': '✌️',
      ':V:': '✌️'
    };

    let convertedText = text;
    Object.entries(emojiMap).forEach(([pattern, emoji]) => {
      const regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      convertedText = convertedText.replace(regex, emoji);
    });
    
    return convertedText;
  };

  // Yeni konuşma başlat
  const startNewConversation = () => {
    const newMessages = [
      {
        id: 1,
        type: 'ai',
        content: 'Merhaba! Psikolojik durumunuzu analiz etmek için buradayım. Ses analizi yaparak size daha iyi yardımcı olabilirim.',
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'ai',
        content: 'Sesinizin analiz edilmesine izin veriyor musunuz? Bu sayede konuşmanızı analiz ederek size daha iyi yardımcı olabilirim. Veya metin mesajı göndererek de sohbet edebiliriz.',
        timestamp: new Date(),
        showConsentButton: true
      }
    ];
    setMessages(newMessages);
    setIsRecording(false);
    setPermissions({ audio: false });
  };

  return (
    <div className="h-full relative z-0">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-magic {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-8px) translateX(4px) rotate(45deg) scale(1.05);
          }
          50% { 
            transform: translateY(-4px) translateX(-2px) rotate(90deg) scale(0.95);
          }
          75% { 
            transform: translateY(-12px) translateX(2px) rotate(135deg) scale(1.02);
          }
        }
        
        @keyframes organic-flow {
          0%, 100% { 
            transform: translateX(0%) translateY(0%) rotate(0deg);
          }
          33% { 
            transform: translateX(1%) translateY(-0.5%) rotate(0.5deg);
          }
          66% { 
            transform: translateX(-0.5%) translateY(1%) rotate(-0.5deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-float-magic {
          animation: float-magic 8s ease-in-out infinite;
        }
      `}</style>
              <div
          className="rounded-xl border border-green-200/30 overflow-hidden h-full flex flex-col animate-fade-in relative"
          style={{ 
            background: `
              linear-gradient(135deg, 
                rgba(255, 255, 255, 0.95) 0%, 
                rgba(240, 253, 244, 0.9) 25%, 
                rgba(220, 252, 231, 0.85) 50%, 
                rgba(187, 247, 208, 0.8) 75%, 
                rgba(134, 239, 172, 0.75) 100%
              )
            `,
            backdropFilter: 'blur(10px)'
          }}
        >
        {/* Ultra-premium forest atmosphere overlay */}
        <div className="absolute inset-0 opacity-20">
          {/* Depth layer 1 - Far forest */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`far-tree-${i}`}
                className="absolute opacity-30"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${15 + Math.sin(i * 0.7) * 10}%`,
                  transform: `scale(${0.4 + Math.sin(Date.now() * 0.001 + i) * 0.1})`,
                  filter: 'blur(1px)'
                }}
              >
                <div className="text-4xl text-green-600">🌲</div>
              </div>
            ))}
          </div>

          {/* Depth layer 2 - Mid forest */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(6)].map((_, i) => (
              <div
                key={`mid-tree-${i}`}
                className="absolute opacity-40"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + Math.sin(i * 1.2) * 15}%`,
                  transform: `scale(${0.6 + Math.sin(Date.now() * 0.0008 + i) * 0.15})`,
                  filter: 'blur(0.5px)'
                }}
              >
                <div className="text-5xl text-emerald-600">🌳</div>
              </div>
            ))}
          </div>

          {/* Floating magical elements */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={`magic-${i}`}
                className="absolute animate-float-magic"
                style={{
                  left: `${20 + (i * 6) % 60}%`,
                  top: `${25 + (i * 7) % 50}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${8 + (i % 3) * 2}s`,
                  transform: `scale(${0.3 + Math.sin(Date.now() * 0.002 + i) * 0.2})`
                }}
              >
                <div className="text-2xl opacity-40">
                  {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🍃' : i % 4 === 2 ? '🌿' : '💫'}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Header */}
        <div className="bg-white/40 backdrop-blur-xl border-b border-white/30 p-6 flex-shrink-0 shadow-lg animate-slide-down">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3CB97F] to-[#267a56] rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 !text-white" style={{ color: '#ffffff !important' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  {doctorMode ? 'AI Klinik Asistan' : 'AI Psikolojik Asistan'}
                </h1>
                <p className="text-gray-600 text-sm">
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
                className="p-2 text-[#3CB97F] hover:text-[#267a56] transition-colors rounded-lg hover:bg-[#3CB97F]/10"
                title="Yeni Konuşma"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              
              <button 
                onClick={stopMediaStream}
                className="px-4 py-2 bg-[#3CB97F] hover:bg-[#267a56] !text-gray-800 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
                style={{ color: '#1f2937' }}
              >
                Oturumu Sonlandır
              </button>
            </div>
          </div>
        </div>

        {/* Ana İçerik - Sadece Sohbet Alanı */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mesajlar */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-4 bg-white/40 backdrop-blur-xl rounded-t-2xl relative">
            {/* Subtle forest pattern overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(134, 239, 172, 0.04) 0%, transparent 50%)
                `,
                backgroundSize: '300px 300px, 400px 400px, 500px 500px',
                animation: 'organic-flow 15s ease-in-out infinite'
              }} />
            </div>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="flex justify-center animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '0.5s',
                  animationFillMode: 'both'
                }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-[#3CB97F] to-[#267a56] text-gray-800'
                      : 'bg-white/60 backdrop-blur-md text-gray-800 border border-white/40 shadow-lg'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  
                  {/* Ses mesajı için oynatma kontrolü */}
                  {message.audioData && (
                    <div className="mt-2 p-2 bg-black/10 rounded-lg">
                      <audio 
                        controls 
                        className="w-full h-8"
                        preload="metadata"
                        controlsList="nodownload"
                        src={message.audioData}
                      >
                        Tarayıcınız ses oynatmayı desteklemiyor.
                      </audio>
                    </div>
                  )}
                  
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                  
                  {/* Onay Butonları */}
                  {message.showConsentButton && (
                    <div className="mt-3 space-y-2 animate-fade-in-up">
                      <button
                        onClick={handleConsent}
                        className="w-full bg-gradient-to-r from-[#3CB97F] to-[#267a56] hover:from-[#267a56] hover:to-[#3CB97F] !text-gray-800 px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        style={{ 
                          color: '#1f2937 !important',
                          backgroundColor: 'rgb(60, 185, 127)',
                          backgroundImage: 'linear-gradient(to right, rgb(60, 185, 127), rgb(38, 122, 86))'
                        }}
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
                        className="w-full bg-gradient-to-r from-[#f87171] to-[#ef4444] hover:from-[#ef4444] hover:to-[#dc2626] !text-gray-800 px-4 py-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        style={{ 
                          color: '#1f2937 !important',
                          backgroundColor: 'rgb(248, 113, 113)',
                          backgroundImage: 'linear-gradient(to right, rgb(248, 113, 113), rgb(239, 68, 68))'
                        }}
                      >
                        Hayır, sadece metin tabanlı sohbet yapalım
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center animate-fade-in-up">
                <div className="bg-white/60 backdrop-blur-md text-[#3CB97F] border border-white/40 max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#3CB97F]"></div>
                    <span className="text-sm font-medium">AI işliyor...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modern Mesaj Girişi */}
          <div className="p-4 pb-8 border-t border-green-200/30 bg-white/50 backdrop-blur-xl flex-shrink-0 shadow-lg animate-slide-up overflow-hidden rounded-b-2xl relative">
            {/* Subtle forest pattern overlay for input area */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 30% 70%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
                  radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 50%)
                `,
                backgroundSize: '200px 200px, 300px 300px',
                animation: 'organic-flow 12s ease-in-out infinite'
              }} />
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative max-w-full">
                  <textarea
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Mesajınızı yazın..."
                    className="w-full max-w-full bg-white/60 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl px-4 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#3CB97F]/50 border-2 border-white/30 hover:border-white/50 transition-all duration-300 min-h-[56px] max-h-40 text-sm shadow-lg transform hover:scale-[1.01]"
                    rows="2"
                    style={{ minHeight: '56px', maxHeight: '160px', overflowY: 'auto', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
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
                      ? 'bg-gradient-to-r from-[#3CB97F] to-[#267a56] hover:from-[#267a56] hover:to-[#3CB97F] !text-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                  }`}
                  style={inputMessage.trim() && !isLoading ? { color: '#1f2937' } : {}}
                >
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Yazıyor Göstergesi */}
              {isTyping && (
                <div className="mt-2 text-xs text-gray-400 flex items-center space-x-2 animate-fade-in-up">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="animate-pulse">Yazıyor...</span>
                </div>
              )}
            </div>
          </div>

          {/* Ses Kontrol Barı - Mesaj Alanının Altında */}
          <VoiceRecorder 
            isRecording={isRecording}
            onSendAudio={handleSendAudio}
            onPermissionChange={handlePermissionChange}
            autoStart={true}
          />
        </div>
      </div>
    </div>
  );
}

export default AIInteraction; 