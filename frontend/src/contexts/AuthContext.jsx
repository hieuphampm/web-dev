import { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient, gql } from '@apollo/client';

export const AuthContext = createContext();

const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
    }
  }
`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();
  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const { data } = await client.query({
            query: ME_QUERY,
            fetchPolicy: 'network-only'
          });
          
          if (data.me) {
            setUser(data.me);
          }
        } catch (error) {
          console.error('Error loading user:', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, [client]);
  
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    client.resetStore();
  };
  
  const isAdmin = () => user && user.role === 'admin';
  const isStaff = () => user && (user.role === 'admin' || user.role === 'staff');
  
  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isStaff }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
