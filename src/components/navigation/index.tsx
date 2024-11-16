'use client'

import {ConnectButton} from "@mysten/dapp-kit";
import {useAppSelector} from "@/store";
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
        link: "/share"
    },
    {
        str: "出题",
        link: "/question"
    }
]

export default function Navigation() {
    const tab = useAppSelector(state => state.oj.tab);

    return (
        <div
            className="fixed flex justify-between items-center w-screen h-16 bg-[#222] xl:px-32 2xl:px-96 text-[#9d9d9d] z-50 opacity-[.97]">
            <div className="flex gap-10 items-center">
                <Link href="/">
                    <h1 className="hidden">LetsMoveOJ</h1>
                    <Image src="/logo/logo.jpeg" alt="HOH Logo" width={60} height={60} priority={true}/>
                </Link>
                {buttons.map((button, idx) => <Link
                    href={button.link}
                    className={(idx === tab ? "px-4 h-16 bg-[#080808] text-white" : "") + " leading-[4rem] hover:text-white transition-all"}
                    key={idx}>{button.str}</Link>
                )}
            </div>
            <ConnectButton/>
        </div>
    )
}