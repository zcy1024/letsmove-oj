'use client'

import Contents from "./contents.mdx"
import {ChangeEvent, useRef, useState} from "react";

export default function ProblemContents({id}: { id: string }) {
    const [file, setFile] = useState<File | undefined>(undefined);
    const fileRef = useRef<HTMLInputElement>(null);

    const changeFile = (event: ChangeEvent<HTMLInputElement> | undefined) => {
        setFile(event?.target?.files?.[0]);
    }

    const submitFile = async () => {
        console.log(await file?.text());
    }

    return (
        <div className="min-h-[86vh] px-3 bg-white shadow-xl">
            <h2 className="py-10 text-2xl select-text">{id}. 标题名</h2>
            <hr/>
            <article className="prose max-w-[50rem] select-text">
                <Contents/>
            </article>
            <div
                className="absolute flex flex-col divide-y top-48 xl:right-32 2xl:right-96 pr-3 w-72 text-sm shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]">
                <p className="flex justify-between items-center h-14 px-3 bg-[#f9f9f9]">
                    <span>gas限制：</span>
                    <span>1000000000000</span>
                </p>
                <p className="flex justify-between items-center h-14 px-3">
                    <span>总通过数：</span>
                    <span>1000000000000</span>
                </p>
                <p className="flex justify-between items-center h-14 px-3 bg-[#f9f9f9]">
                    <span>总提交数：</span>
                    <span>1000000000000</span>
                </p>
                <p className="flex justify-between items-center h-14 pl-1 pr-3">
                    <input className="w-0 opacity-0" name="move" type="file" accept=".move" ref={fileRef}
                           onChange={changeFile}/>
                    <span
                        className="absolute px-2 h-8 text-center leading-8 cursor-pointer bg-[#f9f9f9] rounded-full hover:scale-105 active:scale-95 transition-all"
                        onClick={() => fileRef.current?.click()}>上传文件</span>
                    <span>{file ? file.name : "请选择文件"}</span>
                </p>
                <p className="flex justify-between items-center h-14 pl-1 pr-3 bg-[#f9f9f9]">
                    <button
                        className={"px-2 h-8 text-center leading-8 rounded-full transition-all " + (file ? "bg-white cursor-pointer hover:scale-105 active:scale-95" : "text-[#999]")}
                        onClick={submitFile}
                        disabled={!file}>提交答案
                    </button>
                    <span>Accepted?</span>
                </p>
            </div>
        </div>
    )
}