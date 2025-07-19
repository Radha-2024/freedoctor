import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../utils/supabase'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [camps, setCamps] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })

  useEffect(() => {
    fetchAllCamps()
  }, [])

  const fetchAllCamps = async () => {
    try {
      const { data, error } = await supabase
        .from('medical_camps')
        .select(`
          *,
          profiles:user_id (
            full_name,
            organization
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching camps:', error)
      } else {
        setCamps(data || [])
        
        // Calculate stats
        const total = data?.length || 0
        const pending = data?.filter(camp => camp.status === 'pending').length || 0
        const approved = data?.filter(camp => camp.status === 'approved').length || 0
        const rejected = data?.filter(camp => camp.status === 'rejected').length || 0
        
        setStats({ total, pending, approved, rejected })
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateCampStatus = async (campId, newStatus) => {
    try {
      const { error } = await supabase
        .from('medical_camps')
        .update({ status: newStatus })
        .eq('id', campId)

      if (error) {
        console.error('Error updating camp status:', error)
        alert('Error updating camp status')
      } else {
        // Refresh the camps list
        fetchAllCamps()
      }
    } catch (err) {
      console.error('Error:', err)
      alert('An unexpected error occurred')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredCamps = camps.filter(camp => {
    if (filter === 'all') return true
    return camp.status === filter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage and review medical camp submissions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.total}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Camps
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.pending}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Review
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.approved}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Approved
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{stats.rejected}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Rejected
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Camps', count: stats.total },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'approved', label: 'Approved', count: stats.approved },
                { key: 'rejected', label: 'Rejected', count: stats.rejected }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Camps List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredCamps.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No camps found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No medical camps match the current filter.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredCamps.map((camp) => (
                <li key={camp.id}>
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-medium text-gray-900 truncate">
                            {camp.camp_name}
                          </h4>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(camp.status)}`}>
                            {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Submitted by:</span> {camp.profiles?.full_name || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Organization:</span> {camp.profiles?.organization || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Date & Time:</span> {formatDate(camp.camp_date)}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Location:</span> {camp.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Specialties:</span> {camp.specialties}
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Capacity:</span> {camp.capacity} patients
                            </p>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Submitted:</span> {formatDate(camp.created_at)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Description:</span> {camp.description}
                          </p>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Contact Info:</span> {camp.contact_info}
                          </p>
                        </div>
                        
                        {camp.additional_notes && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Additional Notes:</span> {camp.additional_notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {camp.status === 'pending' && (
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={() => updateCampStatus(camp.id, 'approved')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateCampStatus(camp.id, 'rejected')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard