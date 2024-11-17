'use client'

import {Problems} from "@/components"
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import {useEffect} from "react";
import {setTab, refreshData} from "@/store/modules/oj";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(setTab(0));
        dispatch(refreshData(0));
    }, [dispatch]);
    return (
        <div className="min-h-screen bg-[#f1f2f5] xl:px-32 2xl:px-96 pt-20 pb-10 font-[family-name:var(--font-geist-sans)] text-black">
            <Problems />
        </div>
    );
}
