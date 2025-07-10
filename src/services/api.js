const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// API Response Handler
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// API Service Class
class ApiService {
  // Auth endpoints
  static async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  }

  static async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  }

  // Şifremi unuttum endpoint'i
  static async forgotPassword(email) {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  }

  // Şifre sıfırlama endpoint'i
  static async resetPassword(token, newPassword) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });
    return handleResponse(response);
  }

  // Patient endpoints (for doctors)
  static async getPatients(token) {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  static async getPatientById(patientId, token) {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  static async getPatientAnalyses(patientId, token) {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}/analyses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  static async createPatient(patientData, token) {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return handleResponse(response);
  }

  static async updatePatient(patientId, patientData, token) {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    return handleResponse(response);
  }

  // Analysis endpoints (for users)
  static async submitVoiceAnalysis(audioData, token) {
    const formData = new FormData();
    formData.append('audio', audioData);
    
    const response = await fetch(`${API_BASE_URL}/analyses/voice`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  }

  static async submitFacialAnalysis(imageData, token) {
    const formData = new FormData();
    formData.append('image', imageData);
    
    const response = await fetch(`${API_BASE_URL}/analyses/facial`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  }

  static async submitTestAnalysis(testData, token) {
    const response = await fetch(`${API_BASE_URL}/analyses/test`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    return handleResponse(response);
  }

  static async getUserAnalyses(token) {
    const response = await fetch(`${API_BASE_URL}/analyses/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  // Dashboard statistics
  static async getDashboardStats(token, userType = 'user') {
    const endpoint = userType === 'doctor' ? 'doctor/stats' : 'user/stats';
    const response = await fetch(`${API_BASE_URL}/dashboard/${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  // Alerts for doctors
  static async getAlerts(token) {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  // User profile
  static async getUserProfile(token) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleResponse(response);
  }

  static async updateUserProfile(profileData, token) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    return handleResponse(response);
  }
}

export default ApiService; 