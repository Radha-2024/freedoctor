import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

const SubmitCamp = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    campName: '',
    description: '',
    campDate: '',
    campTime: '',
    location: '',
    specialties: '',
    capacity: '',
    contactInfo: '',
    additionalNotes: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Combine date and time
      const dateTimeString = `${formData.campDate}T${formData.campTime}:00`
      
      const { error } = await supabase
        .from('medical_camps')
        .insert([{
          user_id: user.id,
          camp_name: formData.campName,
          description: formData.description,
          camp_date: dateTimeString,
          location: formData.location,
          specialties: formData.specialties,
          capacity: parseInt(formData.capacity),
          contact_info: formData.contactInfo,
          additional_notes: formData.additionalNotes,
          status: 'pending'
        }])

      if (error) {
        setError(error.message)
      } else {
        alert('Medical camp submitted successfully!')
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit Medical Camp</h1>
          <p className="mt-2 text-gray-600">
            Fill out the form below to submit a medical camp proposal for review.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="campName" className="block text-sm font-medium text-gray-700">
                  Camp Name *
                </label>
                <input
                  type="text"
                  name="campName"
                  id="campName"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Enter a descriptive name for your medical camp"
                  value={formData.campName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Describe the purpose, objectives, and expected outcomes of the medical camp"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="campDate" className="block text-sm font-medium text-gray-700">
                    Camp Date *
                  </label>
                  <input
                    type="date"
                    name="campDate"
                    id="campDate"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    value={formData.campDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="campTime" className="block text-sm font-medium text-gray-700">
                    Camp Time *
                  </label>
                  <input
                    type="time"
                    name="campTime"
                    id="campTime"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                    value={formData.campTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Full address or location details"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                  Medical Specialties *
                </label>
                <input
                  type="text"
                  name="specialties"
                  id="specialties"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="e.g., General Medicine, Pediatrics, Cardiology, Dental"
                  value={formData.specialties}
                  onChange={handleChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate multiple specialties with commas
                </p>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                  Expected Capacity *
                </label>
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  required
                  min="1"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Number of patients expected to serve"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">
                  Contact Information *
                </label>
                <textarea
                  name="contactInfo"
                  id="contactInfo"
                  rows={3}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Primary contact person, phone number, email address"
                  value={formData.contactInfo}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  id="additionalNotes"
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-3 py-2 border"
                  placeholder="Any additional information, special requirements, or notes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Camp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubmitCamp