import React, { useEffect, useState } from 'react'
import { supabase } from './lib/supabase.ts'

function App() {
  const [supabaseStatus, setSupabaseStatus] = useState('Checking...')

  useEffect(() => {
    // Test Supabase connection
    const checkSupabase = async () => {
      try {
        const { data, error } = await supabase.from('_test').select('*').limit(1)
        if (error && error.code === 'PGRST116') {
          // Table doesn't exist, but connection is working
          setSupabaseStatus('Connected ✅')
        } else if (error) {
          setSupabaseStatus(`Connection error: ${error.message}`)
        } else {
          setSupabaseStatus('Connected ✅')
        }
      } catch (err) {
        setSupabaseStatus(`Error: ${err.message}`)
      }
    }
    
    checkSupabase()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>FreeDoctor App</h1>
        <p>Welcome to the FreeDoctor application!</p>
        <div style={{ marginTop: '20px', padding: '10px', background: '#444', borderRadius: '5px' }}>
          <p><strong>Supabase Status:</strong> {supabaseStatus}</p>
        </div>
      </header>
    </div>
  )
}

export default App