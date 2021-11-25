import React, { useRef, useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { storage, database } from '../../misc/firebase';
import { useProfile } from '../../context/Profile.context';
import ProfileAvatar from './ProfileAvatar';

const InputFileTypes = '.png, .jpeg, .jpg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
const isValidFile = fileH => acceptedFileTypes.includes(fileH.type);

const AvatarUpdateBtn = () => {
  const [img, setImg] = useState(null);
  const { isOpen, open, close } = useModalState();
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

  const getBlob = canvas => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('File Process error'));
        }
      });
    });
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);
      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
      console.log(downloadUrl);
      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');
      userAvatarRef.set(downloadUrl);

      setIsLoading(false);

      close();

      Alert.info('Avatar has been uploaded', 4000);
    } catch (error) {
      setIsLoading(false);

      Alert.error(error.message, 4000);
    }
  };

  const onFileInputChange = E => {
    const currFile = E.target.files;
    if (currFile.length === 1) {
      const file = currFile[0];

      if (isValidFile(file)) {
        setImg(file);
        open();
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  return (
    <div className="mt-3 text-center fs-1">
      <ProfileAvatar
        className="img"
        style={{ width: 200, height: 200, fontSize: '10rem' }}
        name={profile.name}
        src={profile.avatar}
      />
      <label
        htmlFor="avatar-upload"
        className="d-block curson-pointer padded"
        style={{ fontSize: '1.5rem' }}
      >
        Select your Avatar
        <input
          id="avatar-upload"
          type="file"
          className="d-none"
          accept={InputFileTypes}
          onChange={onFileInputChange}
        />
      </label>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>adjust or upload new Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-content-center">
            {img && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={img}
                width={250}
                height={250}
                border={10}
                borderRadius={125}
                rotate={0}
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="ghost"
            onClick={onUploadClick}
            disabled={isLoading}
          >
            Upload new Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarUpdateBtn;
