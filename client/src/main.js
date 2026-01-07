import './styles/style.css'

async function testBackend() {
  try {
    const res = await fetch('http://localhost:5000/api/test')
    const data = await res.json()
    console.log('Response from backend:', data.message)
  } catch (error) {
    console.error('Error connecting to backend:', error)
  }
}

testBackend();

