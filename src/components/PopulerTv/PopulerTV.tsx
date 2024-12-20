import { useNavigate } from "react-router-dom"
import { useGetMovieQuery } from "../../store/shows"

function PopulerTV() {
const { data, error, isLoading } = useGetMovieQuery("/tv/popular")
    const prefixImg = "https://image.tmdb.org/t/p/w500/"
    const navigate = useNavigate()
    if (isLoading) return <div>isLoading</div>
    if (error) return <div>Error</div>
    if (data) {
        const movies:[{id:number, name:string, poster_path:string, overview:string}] = data.results

        return (
            <div>
                <div className="row">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-2" >
                            <img className="w-100 rounded" src={prefixImg + movie.poster_path} alt={movie.name} onClick={()=>navigate(`/single/tv/${movie.id}`)} />
                            <h3 className="my-2">{movie.name}</h3>
                            <p>{`${movie.overview.slice(0,50)}...`}</p>
                        </div>
                    ))}
                </div>
            </div>)
    }
}

export default PopulerTV