import React, { createContext, useReducer, ReactNode } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

const initialState: AuthState = { isAuthenticated: false, user: null };

type AuthAction =
  | { type: 'LOGIN'; payload: string }
  | { type: 'LOGOUT' };

// 📌 Reducer con tipado de estado y acciones
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
