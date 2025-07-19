import React, { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('_health').select('*').limit(1)
        if (error && error.code === 'PGRST116') {
          // Table doesn't exist, but connection is working
          console.log('Supabase connection successful')
        } else if (error) {
          throw error
        }
        setLoading(false)
      } catch (err) {
        console.log('Supabase connection test:', err.message)
        setError(err.message)
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>FreeDoctor App</h1>
      <p>Welcome to the FreeDoctor application!</p>
      {error ? (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Supabase connection test: {error}
        </div>
      ) : (
        <div style={{ color: 'green', marginTop: '10px' }}>
          Supabase is configured and ready!
        </div>
      )}
    </div>
  )
}

export default App