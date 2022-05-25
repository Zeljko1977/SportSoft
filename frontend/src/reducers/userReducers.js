import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_RESET,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_RESET,
  GET_SINGLE_USER_REQUEST,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  GET_SINGLE_USER_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
        userInfo: null,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_REGISTER_RESET:
      return {
        loading: true,
        userInfo: null,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        loading: true,
        users: [],
      }
    case GET_ALL_USERS_RESET:
      return {
        loading: true,
        users: [],
      }
    case GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      }
    case GET_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const singleUserReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case GET_SINGLE_USER_REQUEST:
      return {
        loading: true,
        user: null,
      }
    case GET_SINGLE_USER_RESET:
      return {
        loading: true,
        users: null,
      }
    case GET_SINGLE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case GET_SINGLE_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
