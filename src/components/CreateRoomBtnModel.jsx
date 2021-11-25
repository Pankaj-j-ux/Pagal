import React, { useState, useCallback, useRef } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chatt name is Recquired'),
  description: StringType().isRequired('Description is Required'),
});

const INITIAL_VAL = {
  name: '',
  description: '',
};

const CreateRoomBtnModel = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_VAL);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const updateFormValue = useCallback(val => {
    setFormValue(val);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await database.ref('rooms').push(newRoomdata);

      Alert.info(`${formValue.name} has been created`);
      setIsLoading(false);
      setFormValue(INITIAL_VAL);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title style={{ fontWeight: '900', fontSize: '2rem' }}>
            New chat room
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={updateFormValue}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel style={{ fontSize: '1.8rem' }}>
                Room name
              </ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter chat room name..."
                autoComplete="off"
                // onChange={updateFormValue}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel style={{ fontSize: '1.8rem' }}>
                Description
              </ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
                // onChange={updateFormValue}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateRoomBtnModel;
