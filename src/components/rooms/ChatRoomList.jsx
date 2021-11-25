import React, { useState } from 'react';
import { Nav } from 'rsuite';
import RoomItem from '../rooms/RoomItem';

const ChatRoomList = () => {
  const [active, setActive] = useState(null);
  return (
    <>
      <Nav
        appearance="subtle"
        vertical
        reversed
        activeKey={active}
        onSelect={setActive}
        style={{
          overflowY: 'scroll',
        }}
      >
        <Nav.Item>
          <RoomItem />
        </Nav.Item>
      </Nav>
    </>
  );
};

export default ChatRoomList;
