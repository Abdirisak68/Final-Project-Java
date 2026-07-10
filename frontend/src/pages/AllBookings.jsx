import React, { useEffect, useState } from 'react'
import { useApi } from '../context/ApiContext';

const AllBookings = () => {
  const { getBookings, bookings, updateBookingStatus, approveCancellation, rejectCancellation, loading } = useApi();
  const [statusFilter, setStatusFilter] = useState('ALL');

  const bookingStatuses = ['ALL', 'PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLATION_REQUESTED', 'CANCELLED'];

  useEffect(()=>{
    getBookings();
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

  const filteredBookings = statusFilter === 'ALL' 
    ? bookings 
    : bookings.filter(booking => booking.bookingStatus === statusFilter);

  return (
    <div className="mx-auto min-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--primary) tracking-tight">Manage Bookings</h1>
        <p className="mt-2 text-gray-500">
          View and manage all travel bookings across the platform.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {bookingStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                statusFilter === status
                  ? 'bg-(--primary) text-white shadow-md shadow-indigo-500/30'
                  : 'bg-white text-gray-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {status === 'ALL' ? 'All Bookings' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-(--primary) border-t-transparent"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-20 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-dashed border-slate-200">
          <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">
            {statusFilter === 'ALL' ? 'No bookings have been made yet.' : `No bookings with status "${statusFilter.replace('_', ' ')}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div key={booking.bookingId} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {booking.travelPackage?.packageName || 'Package'}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadgeClass(booking.bookingStatus)}`}>
                      {booking.bookingStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500 font-medium">Booking ID</p>
                      <p className="text-gray-900 font-semibold mt-1">#{booking.bookingId}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Customer</p>
                      <p className="text-gray-900 font-semibold mt-1">{booking.user?.firstName} {booking.user?.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Travelers</p>
                      <p className="text-gray-900 font-semibold mt-1">{booking.numberOfTravelers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Total</p>
                      <p className="text-gray-900 font-semibold mt-1">${booking.totalAmount?.toFixed(2) || '0.00'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">Date</p>
                      <p className="text-gray-900 font-semibold mt-1">{new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {booking.bookingStatus === 'PENDING' && (
                    <>
                      <button
                        onClick={() => updateBookingStatus(booking.bookingId, 'CONFIRMED')}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 disabled:opacity-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.bookingId, 'REJECTED')}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all duration-200 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {booking.bookingStatus === 'CANCELLATION_REQUESTED' && (
                    <>
                      <button
                        onClick={() => approveCancellation(booking.bookingId)}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all duration-200 disabled:opacity-50"
                      >
                        Approve Cancel
                      </button>
                      <button
                        onClick={() => rejectCancellation(booking.bookingId)}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-all duration-200 disabled:opacity-50"
                      >
                        Reject Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBookings
