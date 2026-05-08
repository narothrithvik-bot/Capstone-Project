import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  isSidebarOpen: true,
  activeModal: null, // 'add-transaction', 'edit-transaction', etc.
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setActiveModal: (state, action) => {
      state.activeModal = action.payload;
    },
  },
});

export const { toggleDarkMode, toggleSidebar, setActiveModal } = uiSlice.actions;

export const selectDarkMode = (state) => state.ui.darkMode;
export const selectIsSidebarOpen = (state) => state.ui.isSidebarOpen;
export const selectActiveModal = (state) => state.ui.activeModal;

export default uiSlice.reducer;
