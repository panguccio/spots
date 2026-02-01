import { ref } from 'vue'

const user = ref(JSON.parse(localStorage.getItem('user')))
const token = ref(localStorage.getItem('token'))

export function useAuthStore() {

  function setAuth(authUser, authToken) {
    user.value = authUser
    token.value = authToken

    localStorage.setItem('user', JSON.stringify(authUser))
    localStorage.setItem('token', authToken)
  }

  function logout() {
    user.value = null
    token.value = null

    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
  }

  return {
    user,
    token,
    setAuth,
    logout
  }
}
