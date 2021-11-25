import React from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import Dashboard from './Dashboard';
import { useModalState, useMediaQuery } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isSm = useMediaQuery('(max-width: 992px)');

  const onSignOut = () => {
    auth.signOut();
    Alert.info('Signed Out', 4000);
    close();
  };

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isSm} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
