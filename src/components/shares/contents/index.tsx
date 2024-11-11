'use client'

import Contents from "./contents.mdx"

export default function ShareContents({id}: { id: string }) {

    return (
        <div className="min-h-[86vh] px-3 bg-white shadow-xl select-text">
            <h2 className="pt-10 text-3xl font-bold">{id}. 标题名</h2>
            <div className="h-10 leading-10 text-sm opacity-75">
                <span className="mr-10">作者：0x665e60b765225202159ed2ae7933030d48e3cad1e6f3ce9342d50c3d58f4ad80</span>
                <span>时间：2024-12-12</span>
            </div>
            <hr/>
            <article className="prose max-w-none select-text">
                <Contents/>
            </article>
        </div>
    )
}