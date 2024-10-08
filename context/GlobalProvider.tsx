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
  handleSetIsSignedIn: (isSignedIn: boolean) => {},
  user: null,
  handleSetUser: (user: User | null) => {},
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
          handleSetIsSignedIn(true);
          handleSetUser(res);
        } else {
          handleSetIsSignedIn(false);
          handleSetUser(null);
        }
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      })
      .finally(() => setIsLoading(false));
  });

  const handleSetUser = (user: User | null) => {
    setUser(user);
  };

  const handleSetIsSignedIn = (isSignedIn: boolean) => {
    setIsSignedIn(isSignedIn);
  };

  return (
    <GlobalContext.Provider
      value={{
        isSignedIn,
        handleSetIsSignedIn,
        user,
        handleSetUser,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
