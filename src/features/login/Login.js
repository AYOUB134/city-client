// Login.js
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
      const response = await fetch('http://city-server-production.up.railway.app/api/v1/users');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const users = await response.json();
      console.log("email + password "+ email + password);
      console.log("users" , users.data);

      // Find user based on email and password
      const user = users.data.find(u => u.email === email && u.password === password);
      console.log("userrrrrrrrrrrrrrr" , user);

      if (user) {
        console.log("in a user true block");
        // Store userId in localStorage
        localStorage.setItem('userId', user._id);
        console.log("user._id"+user._id);

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
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl sm:w-4/5 sm:max-w-sm">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out transform bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
