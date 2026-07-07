import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { firstName } = useAuth()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-(--primary)">
          Welcome {firstName || "User"}!
        </h1>
        <Link 
          to="/" 
          className="px-4 py-2 bg-(--secondary) rounded-lg hover:bg-(--secondary-hover) text-(--white) transition-colors"
        >
          Back to Home
        </Link>
      </div>
      
      <div className="bg-(--white) p-8 rounded-xl shadow-sm border border-(--gray-200)">
        <p className="text-gray-600 text-lg">
          This is your dashboard. You can manage your account and access your features from here.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
