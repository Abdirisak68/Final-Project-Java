import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { CalendarCheck, MapPin, Package, Users, DollarSign, RefreshCcw } from 'lucide-react'
import { useApi } from '../context/ApiContext'

const Dashboard = () => {
  const { firstName } = useAuth()
  const { users, activeUsers, packages, destinations, getDestinations, getAllActiveUsers, getPackages, getBookings, bookings, paymentStats, getPaymentStats, getAllUsers } = useApi()

  useEffect(() => {
    getAllActiveUsers()
    getPackages()
    getDestinations()
    getBookings()
    getPaymentStats()
    getAllUsers()
  }, [])

  const cards = [
    { title: "Active Users", count: typeof activeUsers === 'number' ? activeUsers : (activeUsers?.length || 0), icon: Users, label: "Online" },
    { title: "Total Packages", count: packages?.length || 0, icon: Package, label: "Active" },
    { title: "Total Bookings", count: bookings?.length || 0, icon: CalendarCheck, label: "Pending" },
    { title: "Total Destinations", count: destinations?.length || 0, icon: MapPin, label: "New" },
    { title: "Total Revenue", count: `$${paymentStats?.totalRevenue || 0}`, icon: DollarSign, label: "Earned" },
    { title: "Total Refunded", count: `$${paymentStats?.totalRefunded || 0}`, icon: RefreshCcw, label: "Returned" },
  ]

  const getRecentActivity = () => {
    const timeline = [];

    if (bookings) {
      bookings.forEach((booking, index) => {
        timeline.push({
          id: `booking-${index}`,
          title: 'New booking created',
          description: `${booking.user?.firstName} ${booking.user?.lastName} booked ${booking.packageName}`,
          date: new Date(booking.bookingDate),
          Icon: CalendarCheck,
          iconBg: 'bg-blue-100',
          iconColor: 'text-(--primary)'
        });
      });
    }

    if (users) {
      users.forEach((user, index) => {
        timeline.push({
          id: `user-${index}`,
          title: 'New user registered',
          description: `${user.firstName} ${user.lastName} joined the platform`,
          date: new Date(user.createdDate),
          Icon: Users,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600'
        });
      });
    }

    if (destinations) {
      destinations.forEach((dest, index) => {
        timeline.push({
          id: `dest-${index}`,
          title: 'New destination added',
          description: `${dest.destCountry} was added to available destinations`,
          date: new Date(dest.created_at || dest.createdDate || Date.now()), // Added fallback in case created_at is undefined
          Icon: MapPin,
          iconBg: 'bg-purple-100',
          iconColor: 'text-(--secondary)'
        });
      });
    }


    if (packages) {
      packages.forEach((pkg, index) => {
        timeline.push({
          id: `pkg-${index}`,
          title: 'New package added',
          description: `${pkg.packageName} was added to available packages`,
          date: new Date(pkg.createdDate),
          Icon: Package,
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600'
        });
      });
    }


    timeline.sort((a, b) => b.date.getTime() - a.date.getTime());

   
    return timeline.slice(0, 10);
  };

  const recentActivity = getRecentActivity();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map((card, index) => (
            <div key={index} className="relative overflow-hidden bg-(--primary)/90 text-(--white) p-7 h-42 w-full rounded-2xl border border-(--white)/10 backdrop-blur-sm transition-all duration-300 group">
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
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-(--primary)">Recent Activity</h2>
          <p className="text-gray-500 mt-1">Check out the latest actions from your platform.</p>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-(--gray-50) hover:bg-(--gray-100) transition-colors">
              <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                <activity.Icon className={`w-5 h-5 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-(--gray-800)">{activity.title}</p>
                <p className="text-sm text-(--gray-500)">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-(--gray-400)">
                {activity.date.toLocaleDateString()}
              </span>
            </div>
          ))}

          {recentActivity.length === 0 && (
            <div className="text-center py-8 text-(--gray-500)">
              No recent activity to display
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default Dashboard
