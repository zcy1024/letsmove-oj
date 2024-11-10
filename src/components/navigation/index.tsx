'use client'

import {ConnectButton} from "@mysten/dapp-kit";
import {useDispatch} from "react-redux";
import {useAppSelector, AppDispatch} from "@/store";
import {setTab} from "@/store/modules/oj";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const buttons = [
    {
        str: "题库",
        link: "/"
    },
    {
        str: "分享",
        link: "/problem/0"
    },
    {
        str: "出题",
        link: "/problem/1"
    }
]

export default function Navigation() {
    const dispatch = useDispatch<AppDispatch>();
    const tab = useAppSelector(state => state.oj.tab);

    const clickTab = (tab: number) => {
        dispatch(setTab(tab));
    }

    return (
        <div
            className="fixed flex justify-between items-center w-screen h-16 bg-[#222] xl:px-32 2xl:px-96 text-[#9d9d9d]">
            <div className="flex gap-10 items-center">
                <Link href="/">
                    <h1 className="hidden">LetsMoveOJ</h1>
                    <Image src="/logo/logo.jpeg" alt="HOH Logo" width={60} height={60} priority={true}/>
                </Link>
                {buttons.map((button, idx) => <Link
                    href={button.link}
                    className={(idx === tab ? "px-4 h-16 bg-[#080808] text-white" : "") + " leading-[4rem] hover:text-white transition-all"}
                    key={idx}
                    onClick={() => clickTab(idx)}>{button.str}</Link>
                )}
            </div>
            <ConnectButton/>
        </div>
    )
}