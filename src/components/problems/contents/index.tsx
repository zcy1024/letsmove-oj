'use client'

import {ChangeEvent, useEffect, useRef, useState} from "react";
import {stringToMap, problemType} from "@/store/modules/oj";
import {useAppSelector} from "@/store";
import {read, strToMDXElement} from "@/utils"
import {MDXRemote, type MDXRemoteSerializeResult} from "next-mdx-remote";
import {useRouter} from "next/navigation";
import {submit, acceptProblem} from "@/lib/contracts"
import {useCurrentAccount} from "@mysten/dapp-kit";

export default function ProblemContents({id}: { id: string }) {
    const [packageID, setPackageID] = useState<string>("");
    const packageIDRef = useRef<HTMLInputElement>(null);

    const changePackageID = (event: ChangeEvent<HTMLInputElement>) => {
        setPackageID(event.target.value);
    }

    const account = useCurrentAccount();
    const [tips, setTips] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const submitAnswer = async () => {
        setSubmitting(true);
        submit(id, packageID, setTips).then(ret => {
            if (ret === "Accepted") {
                setTips("Recording...");
                acceptProblem(account!.address, id).then(success => {
                    setTips(success ? ret : "Recording Error");
                    setSubmitting(false);
                });
            } else {
                setTips(ret);
                setSubmitting(false);
            }
        });
    }

    const router = useRouter();
    const problems = stringToMap(useAppSelector(state => state.oj.problems));
    const [problem, setProblem] = useState<problemType | undefined>(undefined);
    useEffect(() => {
        if (problems.size === 0)
            return
        if (!problem) {
            if (!problems.has(id)) {
                router.push("/not-found");
            }
            setProblem(problems.get(id));
        }
    }, [problems, id, problem, router]);
    const [detail, setDetail] = useState<MDXRemoteSerializeResult | null>();
    useEffect(() => {
        if (problem && !detail) {
            const initDetail = async () => {
                return await read({blobId: problem.detail});
            }
            initDetail().then(detail => {
                const len = detail.split(' ')[0].length;
                if (len > 0) {
                    strToMDXElement(detail.slice(len + 1)).then(md => setDetail(md))
                }
            });
        }
    }, [problem, detail]);

    return (
        <div className="min-h-[86vh] px-3 bg-white shadow-xl">
            <h2 className="py-10 text-2xl select-text">{id}. {problem?.title}</h2>
            <hr/>
            <article className="prose max-w-[50rem] select-text">
                {detail && <MDXRemote {...detail}/>}
            </article>
            <div
                className="absolute flex flex-col divide-y top-48 xl:right-32 2xl:right-96 pr-3 w-72 text-sm shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]">
                <p className="flex justify-between items-center h-14 px-3 bg-[#f9f9f9]">
                    <span>gas限制：</span>
                    <span>{problem?.gas}</span>
                </p>
                <p className="flex justify-between items-center h-14 px-3">
                    <span>总通过数：</span>
                    <span>{problem?.accepted}</span>
                </p>
                <p className="flex justify-between items-center h-14 px-3 bg-[#f9f9f9]">
                    <span>总提交数：</span>
                    <span>{problem?.submitted}</span>
                </p>
                <p className="flex justify-between items-center h-14 px-3">
                    <span>PackageID:</span>
                    <input className="px-2 text-right focus:outline-0" type="text" ref={packageIDRef} onChange={changePackageID}/>
                </p>
                <p className="flex justify-between items-center h-14 pl-1 pr-3 bg-[#f9f9f9]">
                    <button
                        className={"px-2 h-8 text-center leading-8 rounded-full transition-all " + (packageID && !submitting && account ? "bg-white cursor-pointer hover:scale-105 active:scale-95" : "text-[#999]")}
                        onClick={submitAnswer}
                        disabled={!packageID || submitting || !account}>提交答案
                    </button>
                    <span className={submitting ? "" : (tips === "Accepted" ? "text-green-600" : "text-red-600")}>{tips}</span>
                </p>
                {/*<p className="flex justify-between items-center h-14 pl-1 pr-3">*/}
                {/*    <input className="w-0 opacity-0" name="move" type="file" accept="" ref={fileRef}*/}
                {/*           onChange={changeFile}/>*/}
                {/*    <span*/}
                {/*        className="absolute px-2 h-8 text-center leading-8 cursor-pointer bg-[#f9f9f9] rounded-full hover:scale-105 active:scale-95 transition-all"*/}
                {/*        onClick={() => fileRef.current?.click()}>上传文件</span>*/}
                {/*    <span>{file ? file.name : "请选择合约所在目录"}</span>*/}
                {/*</p>*/}
            </div>
        </div>
    )
}