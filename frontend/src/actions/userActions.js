import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from '../constants/userConstants'
import axios from 'axios'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    const userInfo = {
      name: data.data[0].name,
      id: data.data[0].id,
      uloga: data.data[0].uloga,
      token: data.token,
    }

    localStorage.setItem('userInfo', JSON.stringify(userInfo))

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userInfo,
    })
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    })
  }
}

export const registerUs = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error,
    })
  }
}

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get('/api/users/svikorisnici', config)

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: err,
    })
  }
}

export const getSingleUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SINGLE_USER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/svikorisnici/${id}`, config)

    dispatch({
      type: GET_SINGLE_USER_SUCCESS,
      payload: data[0],
    })
  } catch (err) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload: err,
    })
  }
}

export const updateUser = (podaci, id) => async (dispatch, getState) => {
  const pack = { podaci, id }

  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/svikorisnici/update',
      pack,
      config
    )

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({
    type: USER_LOGOUT,
  })
}
