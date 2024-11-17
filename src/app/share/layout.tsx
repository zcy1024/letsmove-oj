'use client'

import {ReactNode, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {refreshData, setTab} from "@/store/modules/oj";

export default function ShareLayout({children}: {children: ReactNode}) {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(setTab(1));
        dispatch(refreshData(1));
    }, [dispatch]);
    return (
        <>
            {children}
        </>
    )
}