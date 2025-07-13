// Form validation utilities

export const validateEmail = (email) => {
  if (!email) {
    return "E-posta gereklidir.";
  }
  if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Geçerli bir e-posta adresi girin.";
  }
  if (email.length > 50) {
    return "E-posta en fazla 50 karakter olabilir.";
  }
  return null;
};

export const validatePassword = (password, isLogin = false) => {
  if (isLogin) return null; // Login'de şifre kontrolü yok
  
  if (!password) {
    return "Şifre gereklidir.";
  }
  if (password.length < 6) {
    return "Şifre en az 6 karakter olmalı.";
  }
  if (password.length > 32) {
    return "Şifre en fazla 32 karakter olabilir.";
  }
  return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Şifre doğrulama gereklidir.";
  }
  if (password !== confirmPassword) {
    return "Şifreler eşleşmiyor.";
  }
  return null;
};

export const validateName = (name) => {
  if (!name) {
    return "Ad Soyad gereklidir.";
  }
  if (name.length > 40) {
    return "Ad Soyad en fazla 40 karakter olabilir.";
  }
  if (!/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s'-]+$/.test(name)) {
    return "Ad Soyad sadece harf, boşluk ve - karakteri içerebilir.";
  }
  return null;
};

export const validateSpecialization = (specialization, isDoctor) => {
  if (isDoctor && !specialization) {
    return "Uzmanlık alanı gereklidir.";
  }
  return null;
};

export const validateAuthForm = (form, isLogin, isDoctor, showForgotPassword) => {
  const errors = {};
  
  // E-posta kontrolü
  const emailError = validateEmail(form.email);
  if (emailError) errors.email = emailError;
  
  // Şifre kontrolü (şifremi unuttum modunda yok)
  if (!showForgotPassword) {
    const passwordError = validatePassword(form.password, isLogin);
    if (passwordError) errors.password = passwordError;
    
    // Şifre doğrulama kontrolü (sadece kayıt)
    if (!isLogin) {
      const confirmPasswordError = validateConfirmPassword(form.password, form.confirmPassword);
      if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
    }
  }
  
  // Ad Soyad kontrolü (kayıt)
  if (!isLogin && !showForgotPassword) {
    const nameError = validateName(form.name);
    if (nameError) errors.name = nameError;
    
    // Uzmanlık kontrolü (doktor)
    const specializationError = validateSpecialization(form.specialization, isDoctor);
    if (specializationError) errors.specialization = specializationError;
  }
  
  return errors;
}; 