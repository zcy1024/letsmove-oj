import {ProblemContents} from "@/components"

const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export function generateStaticParams() {
    return problems.map((_, index) => ({id: index.toString()}))
}

export default async function ProblemPage({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    return (
        <div className="min-h-screen bg-[#f1f2f5] xl:px-32 2xl:px-96 pt-20 pb-10 font-[family-name:var(--font-geist-sans)] text-black">
            <ProblemContents id={id} />
        </div>
    )
}