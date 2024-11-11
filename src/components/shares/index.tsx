'use client'

import Link from "next/link";

const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Shares() {
    return (
        <div className="flex flex-col divide-y min-h-[86vh] px-3 bg-white shadow-xl text-sm select-text">
            <h2 className="py-6 text-5xl font-medium text-center">LetsMove知识分享</h2>
            <div className="flex justify-between pt-5 pb-1 px-6 font-medium">
                <span className="flex-1">标题</span>
                <div className="flex justify-between w-2/3">
                    <span>作者</span>
                    <span className="pr-11">时间</span>
                </div>
            </div>
            {problems.map((problem, index) => (
                <div className={"flex justify-between py-2 px-6 " + (index % 2 === 0 ? "bg-[#f9f9f9]" : "")}
                     key={index}>
                    <Link href={`/share/${index}`}>
                    <span
                        className="flex-1 text-blue-600 font-medium opacity-70 cursor-pointer hover:opacity-90 hover:underline hover:decoration-solid transition-all">
                        标题+test+{problem}
                    </span>
                    </Link>
                    <div className="flex justify-between w-2/3">
                        <span>0x665e60b765225202159ed2ae7933030d48e3cad1e6f3ce9342d50c3d58f4ad80</span>
                        <span>2024-12-12</span>
                    </div>
                </div>
            ))}
        </div>
    )
}