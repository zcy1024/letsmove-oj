const problems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Problems() {
    return (
        <div className="flex flex-col divide-y min-h-[85vh] px-3 bg-white shadow-xl text-sm">
            <h2 className="py-6 text-5xl font-medium text-center">LetsMoveOJ</h2>
            <div className="flex justify-between pt-5 pb-1 px-6 font-medium">
                <span className="w-14 mr-10">#</span>
                <span>标题</span>
                <span className="flex-1 text-right">通过率</span>
            </div>
            {problems.map((problem, index) => (
                <div className={"flex justify-between py-2 px-6 " + (index % 2 === 0 ? "bg-[#f9f9f9]" : "")} key={index}>
                    <span className="w-14 mr-10">{index + 1}</span>
                    <span
                        className="text-blue-600 font-medium opacity-70 cursor-pointer hover:opacity-90 hover:underline hover:decoration-solid transition-all">
                        标题+test+{problem}
                    </span>
                    <span className="flex-1 text-right">{index}.00%</span>
                </div>
            ))}
        </div>
    )
}