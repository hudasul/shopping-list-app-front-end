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
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <body>
    <div className='container'>
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <input 
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <br />
      <br />
      <input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <br />
      <button type="submit">Sign Up</button>
      <br />
      <br />
      <button type="submit" onClick={()=> navigate('/login')}>Login</button>
  
    </form>
    </div>
     </body>
  )
}
export default  SignUp