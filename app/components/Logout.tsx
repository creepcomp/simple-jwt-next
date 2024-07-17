'use client';
import React from 'react';

function Logout() {
  const logout = () => {
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.location.reload();
  };

  return (
    <button className='btn btn-error' onClick={logout}>Logout</button>
  );
}

export default Logout;
