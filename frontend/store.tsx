import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './src/components/redux-toolkit/StudentSlice';

const store = configureStore({
    reducer: {
        students: studentSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>; // RootState type
export type AppDispatch = typeof store.dispatch; // AppDispatch type

export default store;