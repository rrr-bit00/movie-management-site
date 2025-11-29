import AllGetMovie from "@/components/crud/AllGetMovie"
import { mocksData } from "@/lib/mock/mock"

async function getAllMovie() {
    const response = await fetch("http://localhost:8080");
    const movies = await response.json()
    return movies
}

export default async function page() {
    // const movies = await getAllMovie()
    return (
        <div className="flex flex-wrap justify-center">
            {/* <AllGetMovie movies={movies} /> */}
            < AllGetMovie movies={mocksData} />
        </div >
    )
}

