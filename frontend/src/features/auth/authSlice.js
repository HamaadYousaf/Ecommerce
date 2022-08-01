import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    cart: [],
    error: false,
    loading: false,
    success: false,
    message: ''
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

export const addToCart = createAsyncThunk('auth/addToCart', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.addToCart(id, token, user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const removeCart = createAsyncThunk('auth/removeCart', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.removeCart(id, token, user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const showCart = createAsyncThunk(
    'users/show',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await authService.showCart(token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)
console.log(user.cart.length)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.cart = []
            state.error = false
            state.loading = false
            state.success = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.user = null
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.user = action.payload
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.user = null
            })
            .addCase(removeCart.pending, (state) => {
                state.loading = true
            })
            .addCase(removeCart.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.user = action.payload
            })
            .addCase(removeCart.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.user = null
            })
            .addCase(showCart.pending, (state) => {
                state.loading = true
            })
            .addCase(showCart.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.cart = action.payload
            })
            .addCase(showCart.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer