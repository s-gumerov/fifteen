import { useState, createContext, PropsWithChildren, useContext } from 'react'
import { AuthContextProps } from './types'

export const AuthContext = createContext<AuthContextProps>(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthorized, setAuthorization] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider value={{ isAuthorized, setAuthorization }}>
      {children}
    </AuthContext.Provider>
  )
};