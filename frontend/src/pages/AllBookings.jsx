import React, { useEffect, useState } from 'react'
import { useApi } from '../context/ApiContext';
import BookingCard from '../components/BookingCard';

const AllBookings = () => {
  const { getBookings, bookings, updateBookingStatus, approveCancellation, rejectCancellation, loading } = useApi();
  const [statusFilter, setStatusFilter] = useState('ALL');

  const bookingStatuses = ['ALL', 'PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLATION_REQUESTED', 'CANCELLED'];

  useEffect(()=>{
    getBookings();
  },[])

  // getStatusBadgeClass removed as it's now in BookingCard
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
            <BookingCard
              key={booking.bookingId}
              booking={booking}
              isAdmin={true}
              loading={loading}
              onConfirm={updateBookingStatus}
              onReject={(id) => updateBookingStatus(id, 'REJECTED')}
              onApproveCancel={approveCancellation}
              onRejectCancel={rejectCancellation}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBookings
