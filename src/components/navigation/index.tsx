'use client'

import {ConnectButton} from "@mysten/dapp-kit";

export default function Navigation() {
    return (
        <div className="fixed flex justify-between items-center w-screen h-16 bg-[#222] px-96 text-[#9d9d9d]">
            <div className="flex gap-10">
                <button>LOGO</button>
                <button>主页</button>
                <button>分享</button>
                <button>出题</button>
            </div>
            <ConnectButton />
        </div>
    )
}