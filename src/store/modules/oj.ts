import {createSlice, Dispatch, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {getProblems} from "@/lib/contracts"

export type problemType = {
    title: string,
    gas: string,
    detail: string,
    accepted: number,
    submitted: number
};

type initialStateType = {
    tab: number,
    problems: string
};

const initialState = {
    tab: -1,
    problems: "{}"
} as initialStateType;

const ojStore = createSlice({
    name: "oj",
    initialState,
    reducers: {
        setTab(state, action: { payload: number }) {
            state.tab = action.payload
        },
        setProblems(state, action: { payload: string }) {
            state.problems = action.payload
        }
    }
})

const {setTab, setProblems} = ojStore.actions;

const refreshData = (tab: number) => {
    return async (dispatch: ThunkDispatch<{
        oj: initialStateType;
    }, undefined, UnknownAction> & Dispatch) => {
        if (tab === 0) {
            dispatch(setProblems(JSON.stringify(Object.fromEntries(await getProblems()))));
        }
    }
}

const stringToMap = (str: string) => {
    return new Map<string, problemType>(Object.entries(JSON.parse(str)));
}

export {setTab, refreshData, stringToMap};

export default ojStore.reducer;