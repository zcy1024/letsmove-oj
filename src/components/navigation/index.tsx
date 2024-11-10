'use client'

import {ConnectButton} from "@mysten/dapp-kit";
import {useDispatch} from "react-redux";
import {useAppSelector, AppDispatch} from "@/store";
import {setTab} from "@/store/modules/oj";
import Image from "next/image";
import React from "react";

const buttons = ["主页", "分享", "出题"]

export default function Navigation() {
    const dispatch = useDispatch<AppDispatch>();
    const tab = useAppSelector(state => state.oj.tab);

    const clickTab = (tab: number) => {
        dispatch(setTab(tab));
    }

    return (
        <div
            className="fixed flex justify-between items-center w-screen h-16 bg-[#222] xl:px-32 2xl:px-96 text-[#9d9d9d]">
            <div className="flex gap-10">
                <button onClick={() => clickTab(0)}>
                    <h1 className="hidden">LetsMoveOJ</h1>
                    <Image src="/logo/logo.jpeg" alt="HOH Logo" width={60} height={60} priority={true}/>
                </button>
                {buttons.map((str, idx) => <button
                    className={(idx === tab ? "px-4 h-16 bg-[#080808] text-white" : "") + " hover:text-white transition-all"}
                    key={idx}
                    onClick={() => clickTab(idx)}>{str}</button>)}
            </div>
            <ConnectButton/>
        </div>
    )
}