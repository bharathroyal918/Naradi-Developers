// store/slices/notificationSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Notification } from '@/types';

interface NotificationState {
  items: Notification[];
  unreadCount: number;
  isOpen: boolean;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
  isOpen: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.isRead).length;
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.items.find((n) => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead(state) {
      state.items.forEach((n) => (n.isRead = true));
      state.unreadCount = 0;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.unshift(action.payload);
      if (!action.payload.isRead) state.unreadCount += 1;
    },
    toggleNotificationPanel(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setNotifications, markAsRead, markAllAsRead,
  addNotification, toggleNotificationPanel,
} = notificationSlice.actions;
export default notificationSlice.reducer;
