import { createSlice } from "@reduxjs/toolkit";
import { Action } from "history";

const userInfo = createSlice({
    name: "userInfo",

    initialState: {
        searchWord : [],
        user: "",
        userInfo: "",
        detailMatch: "",
    },

    reducers: {
        recordSearchWord : (state:any,action) => {

            const nickNameList = [action.payload, ...state.searchWord]

            return {
                ...state,
                searchWord : nickNameList.filter((element, index) => nickNameList.indexOf(element) === index).splice(0,5)
            }
        },
        deleteSearchWord : (state,action) => {
            return {
                ...state,
                searchWord : state.searchWord.filter((it) => it !== action.payload)
            }
        },
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

export const { recordSearchWord,deleteSearchWord ,addInfo, addDetailMatch, user } = userInfo.actions;

export default userInfo.reducer;
