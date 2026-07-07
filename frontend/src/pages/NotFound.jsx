import React from 'react'
import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background) p-6">
      <div className="bg-(--white) px-8 py-10 md:px-10 md:py-12 rounded-xl shadow-lg w-full max-w-md border border-(--gray-200) text-center">
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <Plane className="text-(--secondary)" size={40} />
          <span className="text-3xl font-bold text-(--primary)">Warfaa</span>
        </div>
        
        <h1 className="text-6xl font-black text-(--primary) mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-(--gray) mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-(--secondary) text-(--white) rounded-lg font-semibold hover:bg-(--secondary-hover) transition-colors"
          >
            Back to Home
          </Link>
          <Link 
            to="/dashboard" 
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
