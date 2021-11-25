import React from 'react';
import { useState } from 'react/cjs/react.development';
import { Alert, Button, Icon, Tag } from 'rsuite';
import { auth } from '../../misc/firebase';
import firebase from 'firebase/app';
const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      value => value.providerId === 'google.com'
    ),

    'facebook.com': auth.currentUser.providerData.some(
      value => value.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(pre => {
      return {
        ...pre,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`you cannot disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconncected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const unlinkGoogle = () => {
    unlink('google.com');
  };
  const unlinkFacebook = () => {
    unlink('facebook.com');
  };

  const link = async Provider => {
    try {
      await auth.currentUser.linkWithPopup(Provider);
      updateIsConnected(Provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  return (
    <>
      <div className="mb-2">
        {isConnected['google.com'] && (
          <Tag color="green" closable onClose={unlinkGoogle}>
            <Icon icon="google" /> Connected
          </Tag>
        )}
        {isConnected['facebook.com'] && (
          <Tag color="blue" closable onClose={unlinkFacebook}>
            <Icon icon="facebook" /> Connected
          </Tag>
        )}
      </div>
      {!isConnected['google.com'] && (
        <Button block color="green" onClick={linkGoogle}>
          <Icon icon="google" /> Link to Google
        </Button>
      )}
      {!isConnected['facebook.com'] && (
        <Button block color="blue" onClick={linkFacebook}>
          <Icon icon="facebook" /> Link to facebook
        </Button>
      )}
    </>
  );
};

export default ProviderBlock;
