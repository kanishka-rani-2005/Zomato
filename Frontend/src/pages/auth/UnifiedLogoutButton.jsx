import { api } from '../../api/config'
import { useNavigate } from 'react-router-dom'

const UnifiedLogoutButton = ({ className }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await api.get('/api/auth/user/logout')
    } catch (err) {console.log(err)}
    try {
      await api.get('/api/auth/food-partner/logout')
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
