import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../../api/config'

const UnifiedLogoutButton = ({ className }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/auth/user/logout`, { withCredentials: true })
    } catch (err) {console.log(err)}
    try {
      await axios.get(`${API_BASE_URL}/api/auth/food-partner/logout`, { withCredentials: true })
    } catch (err) {console.log(err)}
    navigate('/user/login')
  }

  return (
    <button type="button" className={className ?? 'logout-button'} onClick={handleLogout}>
      Logout
    </button>
  )
}

export default UnifiedLogoutButton
