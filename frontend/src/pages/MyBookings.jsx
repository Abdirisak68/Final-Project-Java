import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../context/ApiContext'
import BookingCard from '../components/BookingCard'

function MyBookings() {
  const { getMyBookings, bookings, cancelBooking, loading } = useApi();
  
  useEffect(()=>{
    getMyBookings();
  },[])



  return (
    <div className='mx-auto min-w-3xl'>
      <div>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-(--primary) tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 text-gray-500">
              View and manage your travel bookings.
            </p>
          </div>
          <Link
            to="/add-booking"
            className="inline-flex items-center justify-center rounded-xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-(--secondary) transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/30"
          >
            Book New Package
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--secondary) border-t-transparent"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-dashed border-slate-200">
            <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">Start your travel journey by booking your first package today.</p>
            <Link
              to="/add-booking"
              className="inline-flex items-center justify-center rounded-xl bg-(--primary) px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 hover:bg-(--secondary) transition-all duration-200"
            >
              Book Your First Package
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                isAdmin={false}
                loading={loading}
                onCancel={cancelBooking}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings