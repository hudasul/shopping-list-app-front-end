import { useNavigate } from 'react-router'
import './style/Logoutbutton.css'
function LogoutButton({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    onLogout()
    navigate('/login')
  }

  return (

    <div className='navbar'>
    <button  className='logout-button'
      onClick={handleLogout} 
    >
      Logout
    </button>
    </div>
  )
}

export default LogoutButton