import React from 'react'
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';



export const Header = () => {

  return (
    <>

    <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full top-0 z-50 ">
      <div className="container mx-auto px-4 md:px-20 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
          <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            LifeLink
          </span>
        </Link>
    
        {/* Buttons */}
        <Link to="/signup">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base px-10 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all">
            Register
          </button>
        </Link>
      </div>
    </header>

    </>
  )
}
