// @ts-check
// import { defineStore, acceptHMRUpdate } from 'pinia'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage.getItem('USER_TOKEN') || '',
    id: localStorage.getItem('USER_ID') || '',
    phone: localStorage.getItem('USER_PHONE') || '',
    username: localStorage.getItem('USER_USERNAME') || '',
    multi_depart: localStorage.getItem('USER_MULTI_DEPART') || 0
  }),

  actions: {
    logout() {
      this.$patch({
        token: '',
        id: '',
        phone: '',
        username: '',
        multi_depart: 0
      })
    },
    login(userData) {
      this.$patch({
        token: userData.token || '',
        id: userData.id || '',
        phone: userData.phone || '',
        username: userData.username || '',
        multi_depart: userData.multi_depart || 0
      })
      localStorage.setItem('USER_TOKEN', userData.token)
      localStorage.setItem('USER_ID', userData.id)
      localStorage.setItem('USER_PHONE', userData.phone)
      localStorage.setItem('USER_USERNAME', userData.username)
      localStorage.setItem('USER_MULTI_DEPART', userData.multi_depart)
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
// }
