import React from 'react';

const BookingCard = ({
  booking,
  isAdmin = false,
  loading = false,
  onConfirm,
  onReject,
  onApproveCancel,
  onRejectCancel,
  onCancel
}) => {
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'CONFIRMED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'REJECTED':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'CANCELLATION_REQUESTED':
        return 'bg-orange-200 text-orange-800 border-orange-200';
      case 'CANCELLED':
        return 'bg-slate-200 text-slate-800 border-slate-200';
      default:
        return 'bg-slate-200 text-slate-800 border-slate-200';
    }
  };

  const canCancel = (status) => status === 'PENDING' || status === 'CONFIRMED';

  return (
    <div className="bg-white border-l-4 border-l-(--secondary) border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-(--secondary) opacity-5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-0">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h3 className="text-xl font-bold text-gray-800">
              {booking.travelPackage?.packageName || 'Custom Package'}
            </h3>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(booking.bookingStatus)}`}>
              {booking.bookingStatus}
            </span>
          </div>
          
          <div className={`grid grid-cols-2 ${isAdmin ? 'md:grid-cols-3 lg:grid-cols-5' : 'md:grid-cols-4'} gap-4 text-sm`}>
            <div className="bg-gray-200/80 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-1">Booking ID</p>
              <p className="text-gray-900 font-bold">#{booking.bookingId}</p>
            </div>
            
            {isAdmin && (
              <div className="bg-gray-200/80 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-1">Customer</p>
                <p className="text-gray-900 font-bold truncate">{booking.user?.firstName} {booking.user?.lastName}</p>
              </div>
            )}
            
            <div className="bg-gray-200/80 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-1">Travelers</p>
              <p className="text-gray-900 font-bold">{booking.numberOfTravelers} {booking.numberOfTravelers === 1 ? 'person' : 'people'}</p>
            </div>
            
            <div className="bg-gray-200/80 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-1">Total</p>
              <p className="text-(--primary) font-black">${booking.totalAmount?.toFixed(2) || '0.00'}</p>
            </div>
            
            <div className="bg-gray-200/80 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <p className="text-gray-400 font-semibold text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="text-gray-900 font-bold">{new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap lg:flex-col gap-3 justify-center min-w-36">
          {isAdmin ? (
            <>
              {booking.bookingStatus === 'PENDING' && (
                <>
                  <button
                    onClick={() => onConfirm(booking.bookingId)}
                    disabled={loading}
                    className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-(--primary) hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-md shadow-(--primary)/20"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => onReject(booking.bookingId)}
                    disabled={loading}
                    className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all duration-200 disabled:opacity-50"
                  >
                    Reject
                  </button>
                </>
              )}
              {booking.bookingStatus === 'CANCELLATION_REQUESTED' && (
                <>
                  <button
                    onClick={() => onApproveCancel(booking.bookingId)}
                    disabled={loading}
                    className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 disabled:opacity-50 shadow-md shadow-orange-500/20"
                  >
                    Approve Cancel
                  </button>
                  <button
                    onClick={() => onRejectCancel(booking.bookingId)}
                    disabled={loading}
                    className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
                  >
                    Reject Cancel
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {canCancel(booking.bookingStatus) && (
                <button
                  onClick={() => onCancel(booking.bookingId)}
                  disabled={loading}
                  className="w-full lg:w-auto inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition-all duration-200 disabled:opacity-50 shadow-sm"
                >
                  Cancel Booking
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
