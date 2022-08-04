import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
    name: "userInfo",

    initialState: {
        userInfo: "",
    },

    reducers: {
        addInfo: (state, action) => {
            return {
                ...state,
                userInfo: action.payload,
            };
        },
    },
});

export const { addInfo } = userInfo.actions;

export default userInfo.reducer;
