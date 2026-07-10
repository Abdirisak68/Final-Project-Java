import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CalendarCheck, MapPin, Package, Users } from 'lucide-react'
import { useApi } from '../context/ApiContext'

const Dashboard = () => {
  const { firstName } = useAuth()
  const { users,packages,destinations,getDestinations,getAllUsers,getPackages,getBookings ,bookings} = useApi() 

  useEffect(()=>{
    getAllUsers()
    getPackages()
    getDestinations()
    getBookings()
  },[])

  const cards = [
    {title: "Total Users", count: users.length, icon: Users, label: "+12"},
    {title: "Total Packages", count: packages.length, icon: Package, label: "Active"},
    {title: "Total Bookings", count: bookings.length, icon: CalendarCheck, label: "Pending"},
    {title: "Total Destinations", count: destinations.length, icon: MapPin , label: "New"},
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-(--primary)">
          Dashboard Welcome {firstName || "User"}!
        </h1>
        <Link
          to="/"
          className="px-4 py-2 bg-(--secondary) rounded-lg hover:bg-(--secondary-hover) text-(--white) transition-colors"
        >
          Back to Home
        </Link>
      </div>

      <div className="bg-(--white) p-8 rounded-xl shadow-sm border border-(--gray-200)">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {cards.map((card,index)=>(
            <div className="relative overflow-hidden bg-(--primary)/90 text-(--white) p-7 h-42 w-80 rounded-2xl border border-(--white)/10 backdrop-blur-sm transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium tracking-wide uppercase text-(--white)/70">
                {card.title}
              </h2>
              <div className="p-3 bg-(--white)/10 rounded-xl border border-(--white)/10 text-(--secondary) transition-all duration-300 group-hover:bg-(--secondary) group-hover:text-(--primary) shadow-sm">
                <card.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <p className="text-3xl font-bold tracking-tight text-(--white)">
                {card.count}
              </p>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {card.label}
              </span>
            </div>
          </div>
          ))}

        </div>
      </div>
      <div className="mt-8 bg-(--white) p-6 rounded-2xl shadow-sm border border-(--gray-200)">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold text-(--primary)">Recent Activity</h1>
          <p className="text-gray-500">Check out the latest activities on your dashboard.</p>
        </div>
        
          {/* here will be the recent activity feed */}
        </div>
      </div>

  );
}

export default Dashboard
