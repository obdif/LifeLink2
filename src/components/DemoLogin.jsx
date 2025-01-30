import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DemoLogin() {
  const [regId, setRegId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
    //   const response = await axios.post('https://lifelink-ordc.onrender.com/hospital/login', { regId });
    //   const token = response.data.token;
    //   localStorage.setItem('jwtToken', token);
    //   toast.success('Login successful!', { autoClose: 5000 });
      navigate('/signin');
    } catch (err) {
    //   const message = err.response?.data?.message || 'Invalid registration number.';
    //   setError(message); 
    //   toast.error(message, { autoClose: 5000 });
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
          {/* <h1 className="text-2xl font-bold text-gray-900">Sign In</h1> */}
          <p className="text-gray-600 mt-2">For the purpose of this hackathon, a demo login has been provided, follow the link below to login.</p>
        </div>

        {/* {error && <p className="text-red-600 text-sm">{error}</p>} */}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* <div>
            <label htmlFor="regId" className="block flex text-sm font-medium text-gray-700 mb-1">
              Registration Number<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="regId"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g: DXY-s74DIE983DK"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
            />
          </div> */}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
          Use Demo Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Create an account
          </Link>
        </p>
      </div>
      {/* Toast notification container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
