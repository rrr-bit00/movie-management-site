import { mocksData } from "@/lib/mock/mock"

async function GetMovie(id) {
    const response = await fetch("http://localhost:8080")
    const data = response.json()
    return data
}

export default async function page({ params }) {
    const param = await params
    // const movie = await GetMovie(param.id)


    const movie = mocksData.find(m => m.id == params.id)
    return (
        <div className="bg-gray-200">
            <h2 className="font-bold text-4xl text-center py-2">{movie.title}</h2>
            <div className="max-w-[700px] mx-auto">
                <img src={movie.image} alt="" className="w-full border-solid border-3 border-teal-600" />
                <div className="flex justify-between items-center font-medium text-xl px-2 mt-1">
                    <p>監督：{movie.director}</p>
                    <span>公開年：{movie.released_year}年</span>
                </div>
            </div>
            <p className="text-lg px-6 ">補足：{movie.discription}</p>
        </div>
    )
}
