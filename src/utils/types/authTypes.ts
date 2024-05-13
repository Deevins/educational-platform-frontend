export const SET_TOKEN = 'SET_TOKEN'
export const LOGOUT = 'LOGOUT'
export const AUTH_FAILURE = 'AUTH_FAILURE'

interface SetTokenAction {
  type: typeof SET_TOKEN
  payload: string
}

interface LogoutAction {
  type: typeof LOGOUT
}

interface AuthFailureAction {
  type: typeof AUTH_FAILURE
}

export type AuthActionTypes = SetTokenAction | LogoutAction | AuthFailureAction
