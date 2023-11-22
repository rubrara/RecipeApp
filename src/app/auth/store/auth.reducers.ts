import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: '',
  authenticated: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.SIGNUP:
      return {
        ...state,
        authenticated: true,
      };
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: '',
        authenticated: false,
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
