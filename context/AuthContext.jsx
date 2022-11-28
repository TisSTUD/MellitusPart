import { createContext, useContext, useEffect, useState } from 'react';
import {onAuthStateChanged, sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../firebase';
import Loader from './../components/Loader';


const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState({});
  const [pending, setPending] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setPending(false)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };


  if(pending){
    return( 
    
      <div class=" w-full h-full text-center">
      <div role="status">
        <div className='w-full h-screen'> <Loader/> </div>
      </div>
      </div>
    )
  }

  return (
    <UserContext.Provider value={{ user, forgotPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

