import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Patients = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <header className="border-b bg-white/50 backdrop-blur-sm fixed w-screen top-0 z-50">
        <div className="container mx-full px-20 py-4 flex  justify-between items-center">

          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LifeLink
            </span>
          </Link>

          <Link to="/updatedata">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all">
              Update Patient Data
            </button>

          </Link>

        </div>
      </header>


      

    </div>
  )
}

export default Patients
