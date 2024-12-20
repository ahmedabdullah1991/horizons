import {Skeleton} from "@/components/ui/skeleton"

const JobsSkeleton = () => (
    <main className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
        <div className={"w-1/2 h-[560px] overflow-y-scroll flex flex-col gap-4"}>
            {Array.from({length: 2}, (_, index) => (
                <Skeleton key={index} className={"h-full"}/>
            ))}
        </div>
        <div className={"w-full"}></div>
    </main>
)

export default JobsSkeleton
