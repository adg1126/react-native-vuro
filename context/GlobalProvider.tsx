import { getCurrentUser } from '@/lib/appwrite';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';

const initialState = {
  isSignedIn: false,
  setIsSignedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
};

const GlobalContext = createContext(initialState);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<null | User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsSignedIn(true);
          setUser(res);
        } else {
          setIsSignedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      })
      .finally(() => setIsLoading(false));
  });

  return (
    <GlobalContext.Provider
      value={{ isSignedIn, setIsSignedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
