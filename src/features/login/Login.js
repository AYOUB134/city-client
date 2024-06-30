import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false); // State to manage redirection

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call your API endpoint to authenticate the user
      const response = await fetch('https://city-server-production.up.railway.app/api/v1/users');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const users = await response.json();

      // Find user based on email and password
      const user = users.data.find(u => u.email === email && u.password === password);

      if (user) {
        // Store userId in localStorage
        localStorage.setItem('userId', user._id);
        // Set redirect state to true
        setRedirect(true);
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (redirect) {
    // Conditionally render Navigate component based on redirect state
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">WELCOME BACK</h2>
        <p className="text-center mb-6">
          <span className="text-green-500">City</span>{' '}
          <span className="text-yellow-500">Medical</span>{' '}
          <span className="text-pink-500">&</span>{' '}
          <span className="text-blue-500">Cerjical</span>{' '}
          <span className="text-purple-500">Complex</span>{' '}
          <span className="text-indigo-500">Jatoi</span>
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
           
            </div>
          
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
             Login
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
