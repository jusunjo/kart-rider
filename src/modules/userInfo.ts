import { createSlice } from "@reduxjs/toolkit";

const userInfo = createSlice({
    name: "userInfo",

    initialState: {
        userInfo: "",
        detailMatch: "",
    },

    reducers: {
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

export const { addInfo, addDetailMatch } = userInfo.actions;

export default userInfo.reducer;
