import './style.css'
import { supabase } from './config/supabase.js'

async function testConnection() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.log('No connection', error.message)
  } else {
    console.log('Connected')
    console.log(data)
  }
}

testConnection()