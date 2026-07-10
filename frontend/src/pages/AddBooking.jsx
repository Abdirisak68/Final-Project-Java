import { ArrowLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../context/ApiContext'

const AddBooking = () => {
  const { createBooking, getPackages, packages, loading } = useApi();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    packageId: '',
    numberOfTravelers: 1,
    paymentMethod: '',
    accountNumber: '',
  });

  const paymentMethods = [
    'EVC_PLUS',
    'ZAAD',
    'SAHAL',
    'EDAHAB',
    'PREMIER_BANK',
    'IBS_BANK'
  ];

  useEffect(() => {
    getPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await createBooking({
      ...formData,
      packageId: Number(formData.packageId),
      numberOfTravelers: Number(formData.numberOfTravelers),
      accountNumber: Number(formData.accountNumber),
    });
    
    if (success) {
      navigate('/my-bookings');
    }
  };

  return (
    <div className='mx-auto min-w-3xl'>
      <div>
        <Link
          to="/my-bookings"
          className="mb-4 flex items-center gap-2 text-sm text-gray-500"
        >
          <ArrowLeft size={18} />
          Back to bookings
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-(--primary)">
            Booking Form
          </h1>
          <p className="mt-1 text-gray-500">
            Fill the form below to book your travel package.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Package Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Package *
            </label>
            <select
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--primary) focus:outline-none"
            >
              <option value="">Choose a package</option>
              {packages.filter(pkg => pkg.available).map((pkg) => (
                <option key={pkg.travelPackageId} value={pkg.travelPackageId}>
                  {pkg.packageName} - ${pkg.price?.toFixed(2) || '0.00'}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Travelers *
            </label>
            <input
              type="number"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              min="1"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--primary) focus:outline-none"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method *
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--primary) focus:outline-none"
            >
              <option value="">Select payment method</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number *
            </label>
            <input
              type="number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-(--primary) focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-(--primary) px-4 py-3 text-white hover:bg-(--secondary) transition-colors disabled:opacity-50"
          >
            {loading ? 'Booking...' : 'Book Package'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddBooking
