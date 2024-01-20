import { createContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  
    const logIn = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }
    const logOut = () => {
      localStorage.removeItem('user');
      setUser(null);
    };

    const getAuthHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user?.token) {
            return { Authorization: `Bearer ${user.token}` };
        }

        return {};
    };
  
    return (
      <AuthContext.Provider value={{ user, logIn, logOut, getAuthHeader }}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;