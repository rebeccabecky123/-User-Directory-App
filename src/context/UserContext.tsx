import React, { createContext, useEffect, useReducer, useContext } from "react";
import { User, UserActionType, UserContextType } from '../types';

interface UserState {
  users: User[]; // Corrected: Expecting an array of User objects
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: UserActionType): UserState => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {

      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: User[] = await response.json(); // Corrected: Type assertion for fetched data
        dispatch({type: 'SET_USERS', payload: data });
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: error instanceof Error ? error.message : 'An error occurred'
        });
      } finally {
        dispatch({type: 'SET_LOADING', payload: false });
      }
    };

    fetchUsers();
  }, []);

  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const value: UserContextType = { // Corrected: Explicitly type 'value'
    users: state.users,
    loading: state.loading,
    error: state.error,
    addUser,
    dispatch
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};