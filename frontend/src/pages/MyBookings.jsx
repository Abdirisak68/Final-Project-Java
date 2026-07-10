import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../context/ApiContext'

function MyBookings() {
  const { getMyBookings, bookings, cancelBooking, loading } = useApi();
  
  useEffect(()=>{
    getMyBookings();
  },[])

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CONFIRMED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'CANCELLATION_REQUESTED':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'CANCELLED':
        return 'bg-slate-50 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const canCancel = (status) => {
    return status === 'PENDING' || status === 'CONFIRMED';
  };

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
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--primary) border-t-transparent"></div>
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
              <div key={booking.bookingId} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.travelPackage?.packageName || 'Package'}
                      </h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(booking.bookingStatus)}`}>
                        {booking.bookingStatus.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-medium">Booking ID</p>
                        <p className="text-gray-900 font-semibold mt-1">#{booking.bookingId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Travelers</p>
                        <p className="text-gray-900 font-semibold mt-1">{booking.numberOfTravelers} {booking.numberOfTravelers === 1 ? 'person' : 'people'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Total Amount</p>
                        <p className="text-gray-900 font-semibold mt-1">${booking.totalAmount?.toFixed(2) || '0.00'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">Booking Date</p>
                        <p className="text-gray-900 font-semibold mt-1">{new Date(booking.bookingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center gap-3">
                    {canCancel(booking.bookingStatus) && (
                      <button
                        onClick={() => cancelBooking(booking.bookingId)}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings