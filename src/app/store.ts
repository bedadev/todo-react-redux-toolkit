import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import { todoApiSlice } from "../features/todoApiSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [todoApiSlice.reducerPath]: todoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(todoApiSlice.middleware);
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch