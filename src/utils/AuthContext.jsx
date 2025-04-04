import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from './appwriteConfig';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const defaultAdmin = {
    email: 'admin@gmail.com',
    password: 'admin123',
    name: 'Admin User',
  };

  // Check for user session on mount
  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    setError('');

    try {
      // Admin shortcut
      if (userInfo.email === defaultAdmin.email && userInfo.password === defaultAdmin.password) {
        setUser({ name: defaultAdmin.name, email: defaultAdmin.email });
      } else {
        await account.createEmailSession(userInfo.email, userInfo.password);
        const accountDetails = await account.get();
        setUser(accountDetails);
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession('current');
    } catch (err) {
      console.error('Logout failed:', err);
    }
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);
    setError('');

    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
      await account.createEmailSession(userInfo.email, userInfo.password1);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }

    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
    error,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>
          <div className="flex justify-center items-center h-screen">
            <svg
              className="w-16 h-16 text-gray-200 animate-spin fill-red-500"
              viewBox="0 0 100 101"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051..." fill="currentColor" />
              <path d="M93.9676 39.0409C96.393..." fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
