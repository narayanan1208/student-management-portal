import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './src/components/redux-toolkit/student/StudentSlice';
import authSlice from './src/components/redux-toolkit/authentication/AuthenticationSlice';

const store = configureStore({
    reducer: {
        students: studentSlice,
        auth: authSlice
    },
});

export type RootState = ReturnType<typeof store.getState>; // RootState type
export type AppDispatch = typeof store.dispatch; // AppDispatch type

export default store;