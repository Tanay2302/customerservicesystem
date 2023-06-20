import axios from 'axios'
const API_URL = '/api/users/'
const API_URLL = '/api/users/login/'
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)
   
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    
    return response.data
  }
  const login = async (userData) => {
    const response = await axios.post(API_URLL, userData)
    console.log('t')
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
    return response.data
  }
  const logout=()=>localStorage.removeItem('user')
  const authService = {
    register,
    logout,
    login
   
  }
  
  export default authService  