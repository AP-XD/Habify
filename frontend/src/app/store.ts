import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import routineReducer from '../features/routine/RoutineSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
    reducer: {
        routine: routineReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
