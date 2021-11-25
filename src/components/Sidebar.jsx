import React from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModel from './CreateRoomBtnModel';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

const Sidebar = () => {
  return (
    <>
      <div className="h-100 p-3">
        <div>
          <DashboardToggle />
          <CreateRoomBtnModel />
          <Divider style={{ fontSize: '1.2rem', fontWeight: '700' }}>
            join conversation
          </Divider>
        </div>
        <ChatRoomList />
      </div>
    </>
  );
};

export default Sidebar;
