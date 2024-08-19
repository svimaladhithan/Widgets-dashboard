import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    'CSPM executive dashboard',
    'CWPP dashboard',
    'Registry scan',
  ],
  widgets: [],
  selectedCategoryIndex: 0,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
    },
    setSelectedCategoryIndex: (state, action) => {
      state.selectedCategoryIndex = action.payload;
    },
    deleteWidget: (state, action) => {
        state.widgets = state.widgets.filter((_, index) => index !== action.payload);
      },
      deleteCategory: (state, action) => {
        const indexToDelete = action.payload;
        state.categories = state.categories.filter((_, index) => index !== indexToDelete);
        state.widgets = state.widgets.filter(widget => widget.categoryIndex !== indexToDelete);
        if (state.selectedCategoryIndex === indexToDelete) {
          state.selectedCategoryIndex = Math.max(0, indexToDelete - 1);
        }
      },
  },
});

export const { addCategory, addWidget, setSelectedCategoryIndex, deleteWidget, deleteCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;