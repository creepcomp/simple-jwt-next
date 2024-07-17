'use client';
import React from 'react';

function LoginForm() {
  const [input, setInput] = React.useState({email: '', password: ''});
  const [error, setError] = React.useState({message: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const login = async () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'applicatin/json'
      },
      body: JSON.stringify(input)
    }).then(async (r) => {
      const data = await r.json();
      if (r.ok) document.location = '/';
      else setError(data);
    });
  };

  return (
    <div className='text-center' onSubmit={login}>
      <h1 className='text-5xl p-8'>Login</h1>
      {error.message ? <div className='alert'>{error.message}</div>: null}
      <input className='block input m-1' name='email' type='email' value={input.email} onChange={handleChange} placeholder='Email' required />
      <input className='block input m-1' name='password' type='password' value={input.password} onChange={handleChange} placeholder='Password' required />
      <button className='btn btn-success m-1' onClick={login}>Login</button>
    </div>
  );
}

export default LoginForm;
