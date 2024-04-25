import LoginForm from '@/components/auth/Login_form';
import LoginNavbar from '@/components/auth/login_nav';
import React from 'react';

function LoginPage() {
  return (
    <div>
      <LoginNavbar />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
