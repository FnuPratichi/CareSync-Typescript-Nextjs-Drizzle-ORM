'use client';

import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    age: '',
    email: '',
    password: '',
    roleid: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log(data);
    // You can add UI feedback here
  };

  return (
    <div>
      <h1>Welcome to Register</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="roleid" placeholder="Role ID" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
