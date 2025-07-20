// Ortak yardımcı fonksiyonlar

/**
 * Timestamp'i Türkçe tarih formatına çevirir
 * @param {string} timestamp - ISO timestamp string
 * @returns {string} Türkçe tarih formatı
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'Tarih belirtilmemiş';
  
  const date = new Date(timestamp);
  return date.toLocaleString('tr-TR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Risk seviyesi için renk sınıfını döndürür
 * @param {string} level - Risk seviyesi ('low', 'medium', 'high')
 * @returns {string} Tailwind CSS renk sınıfı
 */
export const getRiskLevelColor = (level) => {
  switch (level) {
    case 'low': return 'text-green-400';
    case 'medium': return 'text-yellow-400';
    case 'high': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

/**
 * Durum için renk sınıfını döndürür
 * @param {string} status - Durum ('active', 'warning', 'inactive')
 * @returns {string} Tailwind CSS renk sınıfı
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'inactive': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

/**
 * Analiz tipi için ikon döndürür
 * @param {string} type - Analiz tipi ('voice', 'facial', 'phq9', 'beck_anxiety')
 * @returns {string} İkon adı
 */
export const getAnalysisIconType = (type) => {
  switch (type) {
    case 'voice': return 'Mic';
    case 'facial': return 'Camera';
    case 'phq9': return 'FileText';
    case 'beck_anxiety': return 'Activity';
    default: return 'Activity';
  }
};

/**
 * Analiz tipi için Türkçe isim döndürür
 * @param {string} type - Analiz tipi
 * @returns {string} Türkçe analiz adı
 */
export const getAnalysisTypeName = (type) => {
  switch (type) {
    case 'voice': return 'Ses Analizi';
    case 'facial': return 'Mimik Analizi';
    case 'phq9': return 'PHQ-9 Testi';
    case 'beck_anxiety': return 'Beck Anksiyete Ölçeği';
    default: return 'Analiz';
  }
};

/**
 * Risk seviyesi için Türkçe isim döndürür
 * @param {string} level - Risk seviyesi
 * @returns {string} Türkçe risk seviyesi
 */
export const getRiskLevelName = (level) => {
  switch (level) {
    case 'low': return 'Düşük';
    case 'medium': return 'Orta';
    case 'high': return 'Yüksek';
    default: return 'Belirsiz';
  }
}; 

// Capitalize name func
export function capitalizeName(name) {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1))
    .join(' ');
}

// Doktor adını uzmanlık seviyesi ile birlikte formatlar
export function formatDoctorName(name, expertiseLevel) {
  if (!name) return '';
  const capitalizedName = capitalizeName(name);
  if (expertiseLevel && expertiseLevel.trim().toLowerCase() !== 'diğer') {
    return `${expertiseLevel} ${capitalizedName}`;
  }
  return capitalizedName;
} 