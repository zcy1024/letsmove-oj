'use client'

import {ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {refreshData, setTab} from "@/store/modules/oj";

export default function ProblemLayout({children}: {children: ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(setTab(0));
        dispatch(refreshData(0));
    }, [dispatch]);
    return (
        <>
            {children}
        </>
    )
}