import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk('user/fetchUser', async ({ email, password }) => {
   try {
      const response = await fetch('https://hudy-tanvir.herokuapp.com/api/users/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email,
            password
         }),
         withCredentials: true,
         credentials: 'include'
      })

      const { status, ...data } = await response.json()

      if (status === 'error') {
         throw new Error('Please check your internet connection')
      }
      else if (status === 'fail') {
         throw data
      }

      const { data: { user }, token } = data

      localStorage.setItem('persist:hudy/user', JSON.stringify({ user, token }))

      return user
   } catch ({ message }) {
      return message
   }
})

const userSlice = createSlice({
   name: 'user',
   initialState: { loading: true, user: {}, error: '', isLoggedIn: false },
   reducers: {
      getUser: (state, action) => {
         if (!action.payload) {
            state.loading = false
         }
         else {
            state.user = action.payload
            state.isLoggedIn = true
            state.error = ''
            state.loading = false
         }
      },
      removeUser: (state) => {
         state.isLoggedIn = false
         state.user = {}
      },
      setError: (state, action) => {
         state.loading = false
         state.error = action.payload
      }
   },
   extraReducers: (builder) => {
      builder.addCase(fetchUser.pending, (state) => {
         state.loading = true
         state.user = {}
         state.error = ''
         state.isLoggedIn = false
      })
      builder.addCase(fetchUser.fulfilled, (state, action) => {
         if (typeof action.payload === 'string') {
            state.error = action.payload
            state.user = {}
            state.isLoggedIn = false
         }
         else {
            state.user = action.payload
            state.error = ''
            state.isLoggedIn = true
         }
         state.loading = false
      })
      builder.addCase(fetchUser.rejected, (state, action) => {
         state.error = action.error.message
         state.user = {}
         state.loading = false
         state.isLoggedIn = false
      })
   }
})

export default userSlice.reducer
export const { getUser, removeUser, setError } = userSlice.actions