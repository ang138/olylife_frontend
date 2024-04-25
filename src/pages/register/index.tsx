import RegisterForm from '@/components/auth/Register_form';
import LoginNavbar from '@/components/auth/login_nav';
import React from 'react';

function RegisterPage() {
  return (
    <div>
      <LoginNavbar />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;