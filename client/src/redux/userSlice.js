import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  selectedEmployee: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   
    setSelectedEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedEmployee } = userSlice.actions;

export default userSlice.reducer;