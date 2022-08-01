import axios from 'axios'

const API_URL = '/api/users/'

const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const addToCart = async (productId, token, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + "add/" + productId, user, config)
    return response.data
}

const removeCart = async (productId, token, user) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + "remove/" + productId, user, config)
    return response.data
}

const showCart = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + "cart", config)
    return response.data
}

const authService = {
    register,
    logout,
    login,
    addToCart,
    removeCart,
    showCart
}

export default authService