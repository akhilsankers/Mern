import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { loginUser } from '../api/api';
import { useUser } from "../context/UserContext";
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { refreshUser } = useUser();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);

      if (response.status === 200 || response.status === 201) {
        alert('Login successful');
         await refreshUser();
        // Redirect based on role
        if (response.data.user.role === 'employer') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex w-full max-w-4xl bg-[#fafafa] border border-gray-500 rounded-2xl shadow-xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8 bg-[#f8f8f8]"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <EnvelopeIcon className="size-5 text-gray-400 mr-2" />
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <LockClosedIcon className="size-5 text-gray-400 mr-2" />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-x-3">
            <Link
              to="/signup"
              className="text-sm font-medium text-gray-700 hover:underline"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 shadow-lg shadow-green-200"
            >
              Login
            </button>
          </div>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:underline">
              Sign Up
            </Link>
            <br />
            <Link to="/" className="text-green-600 hover:underline">
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
