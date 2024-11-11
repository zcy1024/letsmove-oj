'use client'

import {ChangeEvent, useRef, useState} from "react";

type dataType = {
    title: string,
    gas: string,
    problemFile: File | undefined,
    dataFile: File | undefined
}

export default function Questions() {
    const [data, setData] = useState<dataType>({
        title: "",
        gas: "",
        problemFile: undefined,
        dataFile: undefined
    })
    const problemRef = useRef<HTMLInputElement>(null);
    const dataRef = useRef<HTMLInputElement>(null);

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const changeGas = (event: ChangeEvent<HTMLInputElement>) => {
        let gas = event.target.value;
        while (gas.length && (gas[gas.length - 1] < '0' || gas[gas.length - 1] > '9')) {
            gas = gas.slice(0, gas.length - 1);
        }
        while (gas.length > 1 && gas[0] === '0') {
            gas = gas.slice(1);
        }
        event.target.value = gas;
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const changeFile = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.files?.[0]
        });
    }

    const checkCanSubmit = () => {
        return !(data.title === "" || data.gas === "" || data.gas === "0" || data.problemFile === undefined || data.dataFile === undefined)
    }

    const submitProblem = () => {
        console.log(data.title, data.gas, data.problemFile, data.dataFile);
    }

    return (
        <div
            className="absolute flex justify-around items-center h-[50vh] w-[50vh] px-16 bg-white shadow-xl select-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center pl-2">
                    <span>标题：</span>
                    <input className="text-center w-2/3 focus:outline-0 bg-[#f9f9f9] rounded-full px-2" type="text"
                           name="title"
                           onChange={changeTitle}/>
                </div>
                <div className="flex justify-between items-center pl-2">
                    <span>gas限制：</span>
                    <input className="text-center w-2/3 focus:outline-0 bg-[#f9f9f9] rounded-full px-2" type="text"
                           name="gas"
                           onChange={changeGas}/>
                </div>
                <div className="flex justify-between items-center pr-2">
                    <input className="w-0 opacity-0" name="problemFile" type="file" accept=".md,.txt" ref={problemRef}
                           onChange={changeFile}/>
                    <span
                        className="absolute text-center px-2 cursor-pointer bg-[#f9f9f9] rounded-full hover:scale-105 active:scale-95 transition-all"
                        onClick={() => problemRef.current?.click()}>上传题面</span>
                    <span>{data.problemFile ? data.problemFile.name : "请选择文件"}</span>
                </div>
                <div className="flex justify-between items-center pr-2">
                    <input className="w-0 opacity-0" name="dataFile" type="file" accept=".zip" ref={dataRef}
                           onChange={changeFile}/>
                    <span
                        className="absolute text-center px-2 cursor-pointer bg-[#f9f9f9] rounded-full hover:scale-105 active:scale-95 transition-all"
                        onClick={() => dataRef.current?.click()}>上传数据</span>
                    <span
                        className="max-w-20 max-h-6 overflow-hidden">{data.dataFile ? data.dataFile.name : "请选择文件"}</span>
                </div>
                <button
                    className={"flex justify-around px-2 rounded-full transition-all " + (checkCanSubmit() ? "bg-[#f9f9f9] cursor-pointer hover:scale-105 active:scale-95" : "text-[#999]")}
                    onClick={submitProblem}
                    disabled={!checkCanSubmit()}>
                    提交
                </button>
            </div>
        </div>
    )
}