import { createStore } from "vuex";
import axiosClient from "../axiosClient";


const store = createStore({
  state:  {
    users: [],
    error: null,
    loading: false,
  }, 
  getters: {
    usersLength: (state) =>  state.users.length,
  },
  mutations: {
    FETCH_USERS: (state, usersData) => {
      state.loading = false
      state.users = usersData
    },
    ADD_USER: (state, userData) => {
      state.users.push(userData)
    },
    DELETE_USER: (state, id) => {
      state.users = state.users.filter(user => user.id !== id)
    },
    UPDATE_USER: (state, userData) => {
      const indexToUpdate = state.users.findIndex(user => user.id === userData.id)

      state.users[indexToUpdate] = userData
    }
  },
  actions: {
    fetchUsers: async ({commit, state}) => {
      state.loading = true
      state.error = null
      await axiosClient.get('users').then((res) => {
        commit('FETCH_USERS', res.data)
      }).catch(err => {
        state.error = err.message
      })
    },
    addUser: async({commit, state}, userData) => {
      state.error = null
      return await axiosClient.post('users', userData).then((res) => {
        commit('ADD_USER', userData)
      }).catch(err => {
        state.error = err.message
      })
    },
    deleteUser: async ({commit, state}, { id }) => {
      state.error = null
      await axiosClient.delete('users/' + id).then((res) => {
        commit('DELETE_USER', id)
      }).catch(err => {
        state.error = err.message
      })
    },
    updateUser: async ({commit, state}, userData) => {
      state.error = null
       return await axiosClient.put('users/' + userData.id, userData).then(() => {
        commit('UPDATE_USER', userData)
      }).catch(err => {
        state.error = err.message
      })
    }
  }
})

export default store;