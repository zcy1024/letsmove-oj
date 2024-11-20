import {createSlice, Dispatch, ThunkDispatch, UnknownAction} from "@reduxjs/toolkit";
import {getPersonalInfo, getProblems, getShare} from "@/lib/contracts"

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

export type shareType = {
    pid: string,
    sharer: string,
    share_time: string,
    content: string
}

type initialStateType = {
    tab: number,
    problems: string,
    personal: personalType,
    share: string
};

const initialState = {
    tab: -1,
    problems: "{}",
    personal: {
        accepted: [],
        share: []
    },
    share: "{}"
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
        },
        setShare(state, action: { payload: string }) {
            state.share = action.payload
        }
    }
})

const {setTab, setProblems, setPersonal, setShare} = ojStore.actions;

const refreshData = (user?: string) => {
    return async (dispatch: ThunkDispatch<{
        oj: initialStateType;
    }, undefined, UnknownAction> & Dispatch) => {
        dispatch(setProblems(JSON.stringify(Object.fromEntries(await getProblems()))));
        dispatch(setShare(JSON.stringify(Object.fromEntries(await getShare()))));
        if (user) {
            dispatch(setPersonal(await getPersonalInfo(user)));
        }
    }
}

const stringToMap = (str: string, type: number) => {
    if (type === 0) {
        return new Map<string, problemType>(Object.entries(JSON.parse(str)));
    }
    return new Map<string, shareType>(Object.entries(JSON.parse(str)));
}

export {setTab, refreshData, stringToMap};

export default ojStore.reducer;