import Router from 'next/router';
import { createContext, ReactNode, useState } from "react";
import { useMutation } from '@apollo/client'
import { useToast } from '@chakra-ui/react';
import { LOGIN_USER, NEW_USER } from '../graphql/mutations';

type UserType = {
  email: string;
  name: string;
};

type AuthContextData = {
  login: any;
  newUser: any;
  signOut: () => void;
  user: UserType;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | any>({});
  const isAuthenticated = !!user;
  const toast = useToast({
    title: 'Success',
    duration: 2000,
    isClosable: true,
    variant: 'solid',
    status: 'success',
    position: 'top-right'
  });

  function signOut() {
    window.localStorage.removeItem('token')

    Router.push('/')
  }

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: ({ login }) => {
      const { token, user } = login;
      window.localStorage.setItem('token', token)
      setUser(user)

      if (token) {
        toast({ description: 'Welcome' });
        Router.push('admin/users')
      }
    },
    onError: (error) => {
      const description = error?.graphQLErrors?.[0]?.message
      toast({ description, title: 'Error', status: 'error' });
    }
  });

  const [newUser] = useMutation(NEW_USER, {
    onCompleted: () => {
      toast({ description: 'Saved' });
      Router.push('/')
    },
    onError: (error) => { 
      const description = error?.graphQLErrors?.[0]?.message
      toast({ description, title: 'Error', status: 'error' });
    }
  });

  return (
    <AuthContext.Provider value={{ newUser, login, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
