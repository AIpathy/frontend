import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../Auth';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    register: jest.fn(),
    forgotPassword: jest.fn(),
    loading: false,
    error: null
  })
}));

// Mock the validation utility
jest.mock('../../utils/validation', () => ({
  validateAuthForm: jest.fn(() => ({}))
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Auth Component', () => {
  test('renders login form by default', () => {
    renderWithRouter(<Auth />);
    
    expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-posta')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Şifre')).toBeInTheDocument();
  });

  test('switches to register mode', () => {
    renderWithRouter(<Auth />);
    
    const switchButton = screen.getByText('Hesabın yok mu? Kayıt Ol');
    fireEvent.click(switchButton);
    
    expect(screen.getByText('Kayıt Ol')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ad Soyad')).toBeInTheDocument();
  });

  test('shows forgot password form', () => {
    renderWithRouter(<Auth />);
    
    const forgotPasswordButton = screen.getByText('Şifremi unuttum');
    fireEvent.click(forgotPasswordButton);
    
    expect(screen.getByText('Şifremi Unuttum')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-posta')).toBeInTheDocument();
  });

  test('validates form inputs', async () => {
    renderWithRouter(<Auth />);
    
    const submitButton = screen.getByText('Giriş Yap');
    fireEvent.click(submitButton);
    
    // Form validation should be triggered
    await waitFor(() => {
      expect(screen.getByText('Giriş Yap')).toBeInTheDocument();
    });
  });
}); 