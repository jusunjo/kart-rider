import { createSlice } from "@reduxjs/toolkit";
import { Action } from "history";

const userInfo = createSlice({
    name: "userInfo",

    initialState: {
        user: "",
        userInfo: "",
        detailMatch: "",
    },

    reducers: {
        user: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },
        addInfo: (state, action) => {
            return {
                ...state,
                userInfo: action.payload,
            };
        },
        addDetailMatch: (state, action) => {
            return {
                ...state,
                detailMatch: action.payload,
            };
        },
    },
});

export const { addInfo, addDetailMatch, user } = userInfo.actions;

export default userInfo.reducer;
