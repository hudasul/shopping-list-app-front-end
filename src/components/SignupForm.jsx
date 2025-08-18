import { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await axios.post('http://localhost:3000/auth/signup', {
        username,
        password
      })
      alert('User registered, please login')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input 
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}
export default  SignUp