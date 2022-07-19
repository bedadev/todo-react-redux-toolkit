import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      if(state.value < 1) {
        return
      }
      state.value--
    },
    amoundAdded: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, amoundAdded } = counterSlice.actions

export default counterSlice.reducer