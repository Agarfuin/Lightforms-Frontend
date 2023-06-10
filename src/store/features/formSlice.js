import { createSlice } from "@reduxjs/toolkit";

const initialState = {
form:{
  id: null,
  title:null,
  formIdentifier:null
}

};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setForm } = formSlice.actions;

export default formSlice.reducer;
