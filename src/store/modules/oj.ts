import {createSlice} from "@reduxjs/toolkit";

type initialStateType = {
    tab: number
};

const initialState = {
    tab: 0
} as initialStateType;

const ojStore = createSlice({
    name: "oj",
    initialState,
    reducers: {
        setTab(state, action: { payload: number }) {
            state.tab = action.payload
        }
    }
})

const {setTab} = ojStore.actions;

export {setTab};

export default ojStore.reducer;