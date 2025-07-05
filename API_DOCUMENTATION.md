# AIpathy API Dokümantasyonu

## 🚀 Genel Bilgiler

- **Base URL**: `http://localhost:3001/api`
- **Authentication**: JWT Bearer Token
- **Content-Type**: `application/json` (multipart/form-data for file uploads)

## 🔐 Authentication Endpoints

### POST /auth/login
Kullanıcı girişi

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "userType": "user" // "user" veya "doctor"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Kullanıcı Adı",
    "email": "user@example.com",
    "userType": "user",
    "specialization": "Psikiyatri" // sadece doktorlar için
  }
}
```

### POST /auth/register
Kullanıcı kaydı

**Request Body:**
```json
{
  "name": "Kullanıcı Adı",
  "email": "user@example.com",
  "password": "Password123",
  "userType": "user" // "user" veya "doctor"
}
```

**Response:**
```json
{
  "message": "Kullanıcı başarıyla oluşturuldu",
  "user": {
    "id": 1,
    "name": "Kullanıcı Adı",
    "email": "user@example.com",
    "userType": "user"
  }
}
```

## 👥 User Endpoints

### GET /user/profile
Kullanıcı profilini getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "Kullanıcı Adı",
  "email": "user@example.com",
  "userType": "user",
  "specialization": "Psikiyatri", // sadece doktorlar için
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLogin": "2024-01-15T14:30:00Z"
}
```

### PUT /user/profile
Kullanıcı profilini güncelle

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Yeni Ad",
  "email": "newemail@example.com"
}
```

## 🏥 Patient Endpoints (Doktorlar için)

### GET /patients
Tüm hastaları listele

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "age": 28,
    "status": "active", // "active", "inactive", "warning"
    "riskLevel": "medium", // "low", "medium", "high"
    "lastActivity": "2024-01-15T14:30:00Z",
    "createdAt": "2024-01-01T10:00:00Z"
  }
]
```

### GET /patients/:id
Belirli hasta detaylarını getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "age": 28,
  "status": "active",
  "riskLevel": "medium",
  "lastActivity": "2024-01-15T14:30:00Z",
  "createdAt": "2024-01-01T10:00:00Z"
}
```

### GET /patients/:id/analyses
Hastanın analiz geçmişini getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "voice", // "voice", "facial", "phq9", "gad7"
    "score": 7.5,
    "details": "Ses analizi sonucu: Hafif stres belirtileri",
    "timestamp": "2024-01-15T14:30:00Z"
  }
]
```

### POST /patients
Yeni hasta ekle

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Yeni Hasta",
  "email": "hasta@example.com",
  "age": 30
}
```

### PUT /patients/:id
Hasta bilgilerini güncelle

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Güncellenmiş Ad",
  "email": "newemail@example.com",
  "age": 31
}
```

## 📊 Analysis Endpoints

### POST /analyses/voice
Ses analizi gönder

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```
multipart/form-data
audio: <audio_file>
```

**Response:**
```json
{
  "id": 1,
  "type": "voice",
  "score": 7.5,
  "details": "Ses analizi sonucu: Hafif stres belirtileri",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

### POST /analyses/facial
Mimik analizi gönder

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```
multipart/form-data
image: <image_file>
```

**Response:**
```json
{
  "id": 2,
  "type": "facial",
  "score": 6.8,
  "details": "Mimik analizi: Normal duygu durumu",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

### POST /analyses/test
Test sonucu gönder

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "type": "phq9", // "phq9" veya "gad7"
  "answers": [1, 2, 0, 1, 2, 1, 0, 1, 2], // PHQ-9 için 9 soru
  "totalScore": 10
}
```

**Response:**
```json
{
  "id": 3,
  "type": "phq9",
  "score": 8.2,
  "details": "PHQ-9 testi: Orta düzey depresyon belirtileri",
  "timestamp": "2024-01-15T14:30:00Z"
}
```

### GET /analyses/user
Kullanıcının kendi analizlerini getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "type": "voice",
    "score": 7.5,
    "details": "Ses analizi sonucu: Hafif stres belirtileri",
    "timestamp": "2024-01-15T14:30:00Z"
  }
]
```

## 📈 Dashboard Endpoints

### GET /dashboard/user/stats
Kullanıcı dashboard istatistikleri

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "weeklyAnalyses": 5,
  "averageScore": 7.2,
  "lastUpdate": "2024-01-15T14:30:00Z",
  "totalAnalyses": 15
}
```

### GET /dashboard/doctor/stats
Doktor dashboard istatistikleri

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalPatients": 25,
  "weeklyAnalyses": 45,
  "highRiskPatients": 3,
  "activePatients": 22
}
```

## 🚨 Alert Endpoints

### GET /alerts
Doktor uyarılarını getir

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Yüksek Risk Uyarısı",
    "message": "Mehmet Kaya için yüksek risk seviyesi tespit edildi.",
    "type": "high_risk",
    "patientId": 3,
    "patient": {
      "id": 3,
      "name": "Mehmet Kaya",
      "email": "mehmet@example.com"
    },
    "createdAt": "2024-01-15T14:30:00Z"
  }
]
```

## 🗄️ Veritabanı Şeması

### Users Tablosu
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  userType ENUM('user', 'doctor') NOT NULL,
  specialization VARCHAR(100), -- sadece doktorlar için
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastLogin TIMESTAMP NULL
);
```

### Patients Tablosu
```sql
CREATE TABLE patients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  status ENUM('active', 'inactive', 'warning') DEFAULT 'active',
  riskLevel ENUM('low', 'medium', 'high') DEFAULT 'low',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastActivity TIMESTAMP NULL
);
```

### Analyses Tablosu
```sql
CREATE TABLE analyses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  userId INT,
  patientId INT NULL, -- doktorlar için hasta ID'si
  type ENUM('voice', 'facial', 'phq9', 'gad7') NOT NULL,
  score DECIMAL(3,1) NOT NULL,
  details TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (patientId) REFERENCES patients(id)
);
```

### Alerts Tablosu
```sql
CREATE TABLE alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('high_risk', 'inactive_patient', 'system') NOT NULL,
  patientId INT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patientId) REFERENCES patients(id)
);
```

## 🔧 Environment Variables

Backend için gerekli environment değişkenleri:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=aipathy_db

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760 # 10MB
```

## 📝 Notlar

1. **Authentication**: Tüm protected endpoint'ler için JWT token gerekli
2. **File Upload**: Ses ve görüntü dosyaları için multipart/form-data kullanılmalı
3. **Error Handling**: Tüm hatalar standart JSON formatında döndürülmeli
4. **Validation**: Tüm input'lar server-side validate edilmeli
5. **Security**: Password'ler hash'lenmeli, SQL injection koruması olmalı

## 🚀 Örnek Kullanım

### Frontend'den API çağrısı:
```javascript
import ApiService from './services/api';

// Giriş
const login = async () => {
  try {
    const response = await ApiService.login({
      email: 'user@example.com',
      password: 'Password123',
      userType: 'user'
    });
    localStorage.setItem('token', response.token);
  } catch (error) {
    console.error('Login error:', error);
  }
};

// Hasta listesi (doktorlar için)
const getPatients = async () => {
  try {
    const token = localStorage.getItem('token');
    const patients = await ApiService.getPatients(token);
    console.log(patients);
  } catch (error) {
    console.error('Error:', error);
  }
};
``` 