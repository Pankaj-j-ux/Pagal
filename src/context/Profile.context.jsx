import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authState => {
      if (authState) {
        userRef = database.ref(`/profiles/${authState.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();
          const currProfile = {
            name,
            avatar,
            createdAt,
            uid: authState.uid,
            email: authState.email,
          };
          setProfile(currProfile);
          setIsLoading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();

      if (userRef) {
        userRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
