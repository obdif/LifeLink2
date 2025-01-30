import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    hospitalType: '',
    contactEmail: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://lifelink-ordc.onrender.com/hospital/create', formData);
      setSuccess('Hospital registered successfully! Registration ID: ' + response.data.regId);
      toast.success('Hospital registered successfully!', { autoClose: 5000 });
      navigate('/signin'); 
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register the hospital.';
      setError(message); 
      toast.error(message, { autoClose: 5000 });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex mt-20 items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">Join our health community today</p>
        </div>

        {/* {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>} */}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block flex text-sm font-medium text-gray-700 mb-1">
              Hospital Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter Hospital full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="hospitalType" className="block flex text-sm font-medium text-gray-700 mb-1">
              Type of Hospital<span className="text-red-600">*</span>
            </label>
            <select
              id="hospitalType"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={formData.hospitalType}
              onChange={handleChange}
            >
              <option value="">Select Hospital Type</option>
              <option value="Private">Private</option>
              <option value="Public">Public</option>
            </select>
          </div>
          <div>
            <label htmlFor="contactEmail" className="block flex text-sm font-medium text-gray-700 mb-1">
              Contact Email<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter hospital email"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address" className="block flex text-sm font-medium text-gray-700 mb-1">
              Address<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="address"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter hospital address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
       {/* Toast notification container */}
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
