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
      const widgetId = action.payload;
      state.widgets = state.widgets.filter(widget => widget.id !== widgetId);
    },
    deleteCategory: (state, action) => {
      const categoryIndex = action.payload;
      state.categories = state.categories.filter((_, index) => index !== categoryIndex);
      state.widgets = state.widgets.filter(widget => widget.categoryIndex !== categoryIndex);
      if (state.selectedCategoryIndex === categoryIndex) {
        state.selectedCategoryIndex = Math.max(0, categoryIndex - 1);
      }
    },
  },
});

export const { addCategory, addWidget, setSelectedCategoryIndex, deleteWidget, deleteCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;