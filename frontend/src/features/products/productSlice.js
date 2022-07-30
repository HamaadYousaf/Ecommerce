import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products: [],
    error: false,
    success: false,
    loading: false,
    message: '',
}

export const getProducts = createAsyncThunk(
    'products/getAll',
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts()
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

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.message = action.payload
            })
    },
})

export const { reset } = productSlice.actions
export default productSlice.reducer