import {Skeleton} from "@/components/ui/skeleton"

const JobsSkeleton = () => (
    <>
        <main className={"container max-w-6xl mx-auto px-4 gap-2"}>
            <Skeleton className={"h-9"}/>
        </main>
        <section className={"flex-row items-start justify-between container max-w-6xl mx-auto gap-4 p-4 hidden lg:flex"}>
            <div className={"w-1/2 h-[560px] overflow-y-scroll flex flex-col gap-4"}>
                {Array.from({length: 2}, (_, index) => (
                    <Skeleton key={index} className={"h-full"}/>
                ))}
            </div>
            <div className={"w-full"}></div>
        </section>
    </>
)

export default JobsSkeleton

export const SearchJobsSkeleton = () => (
    <main className={"container max-w-6xl mx-auto gap-4"}>
        <div className={"h-[560px] w-full overflow-y-scroll grid grid-cols-2 gap-4"}>
            {Array.from({length: 4}, (_, index) => (
                <Skeleton key={index} className={"h-full"}/>
            ))}
        </div>
    </main>
)