import React from 'react';
import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'This is login page',
};

function Login() {
  return (
    <main className='flex justify-center items-center h-screen'>
      <LoginForm />
    </main>
  );
}

export default Login;