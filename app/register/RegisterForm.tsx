'use client';
import React from 'react';

function RegisterForm() {
  const [input, setInput] = React.useState({email: '', password: '', password2: ''});
  const [error, setError] = React.useState({message: ''});

  const register = async () => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'applicatin/json'
      },
      body: JSON.stringify(input)
    }).then(async (r) => {
      const data = await r.json();
      if (r.ok) document.location = '/login';
      else setError(data);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className='text-center'>
      <h1 className='text-5xl p-8'>Register</h1>
      {error.message ? <div className='alert'>{error.message}</div>: null}
      <input className='block input m-1' name='email' type='email' value={input.email} onChange={handleChange} placeholder='Email' required />
      <input className='block input m-1' name='password' type='password' value={input.password} onChange={handleChange} placeholder='Password' required />
      <input className='block input m-1' name='password2' type='password' value={input.password2} onChange={handleChange} placeholder='Confirm Password' required />
      <button className='btn btn-success m-1' onClick={register}>Register</button>
    </div>
  );
}

export default RegisterForm;
