import React from 'react';
import type { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'This is register page',
};

const Register = () => {
  return (
    <main className='flex justify-center items-center h-screen'>
      <RegisterForm />
    </main>
  );
};

export default Register;
