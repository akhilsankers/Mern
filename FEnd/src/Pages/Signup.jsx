import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';
import { registerUser } from '../api/api';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'jobseeker',
    phone: '',
    location: '',
    company: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup data', formData);

    try {
      const response = await registerUser(formData);
      if (response.status === 200 || response.status === 201) {
        alert("Registration successful");
        navigate('/login'); // redirect
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex w-full max-w-4xl bg-[#fafafa] border border-gray-500 rounded-2xl shadow-xl overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <form onSubmit={handleSubmit} className="relative w-full md:w-1/2 p-8 bg-[#f8f8f8]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Create an Account
          </h2>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Username</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <UserCircleIcon className="size-5 text-gray-400 mr-2" />
              <input
                name="username"
                type="text"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Email</label>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Phone Number</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <PhoneIcon className="size-5 text-gray-400 mr-2" />
              <input
                name="phone"
                type="text"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">Location</label>
            <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
              <MapPinIcon className="size-5 text-gray-400 mr-2" />
              <input
                name="location"
                type="text"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Company (for employer only) */}
          {formData.role === 'employer' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-900">Company Name</label>
              <div className="mt-1 flex items-center rounded-md border border-gray-500 bg-white px-2 py-1 shadow-sm">
                <BuildingOfficeIcon className="size-5 text-gray-400 mr-2" />
                <input
                  name="company"
                  type="text"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900">Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-500 bg-white py-1 px-2 text-sm text-gray-900 shadow-sm"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-x-3">
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:underline">
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500 shadow-lg shadow-green-200"
            >
              Sign Up
            </button>
          </div>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:underline">
              Log In
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

export default Signup;
