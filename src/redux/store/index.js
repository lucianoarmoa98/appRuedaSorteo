import {configureStore} from '@reduxjs/toolkit';
import reducerGlobal from '../../redux/reducers/reducer';

export const store = configureStore({
    reducer: reducerGlobal,
});