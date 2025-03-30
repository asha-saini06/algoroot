import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthContextType, User } from '../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'DELETE_ACCOUNT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
    case 'DELETE_ACCOUNT':
      return initialState;
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string) => {
    // Simulate API call
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
    };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const deleteAccount = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'DELETE_ACCOUNT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};