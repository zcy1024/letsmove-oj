'use client'

import Link from "next/link";
import {problemType, shareType, stringToMap} from "@/store/modules/oj";
import {useAppSelector} from "@/store";

export default function Shares() {
    const shares = stringToMap(useAppSelector(state => state.oj.share), 1) as Map<string, shareType>;
    const problems = stringToMap(useAppSelector(state => state.oj.problems), 0) as Map<string, problemType>;

    return (
        <div className="flex flex-col divide-y min-h-[85vh] px-3 bg-white shadow-xl text-sm select-text">
            <h2 className="py-6 text-5xl font-medium text-center">LetsMove知识分享</h2>
            <div className="flex justify-between pt-5 pb-1 px-6 font-medium">
                <span className="flex-1">标题</span>
                <div className="flex justify-between w-2/3">
                    <span>作者</span>
                    <span className="pr-[6.5rem]">时间</span>
                </div>
            </div>
            {Array.from(shares.keys()).map((key, index) => {
                const share = shares.get(key)!;
                const problem = problems.get(share.pid);
                return (
                    <div className={"flex justify-between py-2 px-6 " + (index % 2 === 0 ? "bg-[#f9f9f9]" : "")}
                         key={index}>
                        <Link href={`/share/${key}`}>
                    <span
                        className="flex-1 text-blue-600 font-medium opacity-70 cursor-pointer hover:opacity-90 hover:underline hover:decoration-solid transition-all">
                        {(problem ? problem.title : "Some Problem")}
                    </span>
                        </Link>
                        <div className="flex justify-between w-2/3">
                            <span>{share.sharer}</span>
                            <span>{share.share_time}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}