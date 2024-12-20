import {Skeleton} from "@/components/ui/skeleton"

const JobsSkeleton = () => (
    <main className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
        <div className={"w-1/2 h-[700px] overflow-y-scroll flex flex-col gap-2"}>
            {Array.from({length: 3}, (value, index) => (
                <Skeleton key={index} className={"h-56"}/>
            ))}
        </div>
        <div className={"w-full"}></div>
    </main>
)

export default JobsSkeleton
