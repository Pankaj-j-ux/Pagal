import React from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const signInWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed In', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <>
      <Container>
        <Grid>
          <Row>
            <Col xs={24} md={12} mdOffset={6}>
              <Panel>
                <div className="text-center my-5">
                  <h1>Welcome to Chat-App</h1>
                  <div style={{ fontSize: '1.4rem' }}>
                    A Progressive chat application for Neophytes
                  </div>
                </div>

                <div className="my-5">
                  <Button block color="blue" onClick={onFacebookSignIn}>
                    <Icon icon="facebook" style={{ marginRight: '1rem' }} />
                    Continue with Facebook
                  </Button>
                  <Button block color="green" onClick={onGoogleSignIn}>
                    <Icon icon="google" style={{ marginRight: '1rem' }} />
                    Continue with Google
                  </Button>
                </div>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </Container>
    </>
  );
};

export default SignIn;
