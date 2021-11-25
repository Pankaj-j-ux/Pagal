import React, { useCallback, useState } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Write your value',
  emptyMsg = 'Input is empty',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);
  const onInputChange = useCallback(Value => {
    setInput(Value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable(P => !P);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
      return;
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditable(false);
  };

  return (
    <>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </>
  );
};

export default EditableInput;
