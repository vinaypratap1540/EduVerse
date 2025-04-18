import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi.js";
import authReducer from "../features/authSlice.js"
import { courseApi } from "../features/api/courseApi.js";
import { purchaseApi } from "../features/api/purchaseApi.js";
import { courseProgressApi } from "../features/api/courseProgressApi.js";
const rootReducer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth:authReducer
});

export default rootReducer