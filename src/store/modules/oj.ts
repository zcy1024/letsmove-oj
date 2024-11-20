import {createSlice, Dispatch, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {getPersonalInfo, getProblems} from "@/lib/contracts"

export type problemType = {
    title: string,
    gas: string,
    detail: string,
    accepted: number,
    submitted: number,
    inputs: string[],
    outputs: string[]
};

export type personalType = {
    accepted: string[],
    share: string[]
}

type initialStateType = {
    tab: number,
    problems: string,
    personal: personalType
};

const initialState = {
    tab: -1,
    problems: "{}",
    personal: {
        accepted: [],
        share: []
    }
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
        },
        setPersonal(state, action: { payload: personalType }) {
            state.personal = action.payload
        }
    }
})

const {setTab, setProblems, setPersonal} = ojStore.actions;

const refreshData = (tab: number, user?: string) => {
    return async (dispatch: ThunkDispatch<{
        oj: initialStateType;
    }, undefined, UnknownAction> & Dispatch) => {
        if (tab === 0) {
            dispatch(setProblems(JSON.stringify(Object.fromEntries(await getProblems()))));
        }
        if (user) {
            dispatch(setPersonal(await getPersonalInfo(user)));
        }
    }
}

const stringToMap = (str: string) => {
    return new Map<string, problemType>(Object.entries(JSON.parse(str)));
}

export {setTab, refreshData, stringToMap};

export default ojStore.reducer;