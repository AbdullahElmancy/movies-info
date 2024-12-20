import { useSelector } from "react-redux"
import { useGetMovieQuery } from "../../store/shows"
import { RootState } from "../../store/store"
import style from './trendingtv.module.css'
import { useNavigate } from "react-router-dom"
function TrendingTV() {
    const { data, error, isLoading } = useGetMovieQuery("trending/tv/week")
    const navigate = useNavigate()

    const name = useSelector((state:RootState)=> state.tokenReducer.name)
    const prefixImg = "https://image.tmdb.org/t/p/w500/"
    if (isLoading) return <div>isLoading</div>
    if (error) return <div>Error</div>
    if (data) {
        const movies:[{id:number, name:string, poster_path:string, overview:string}] = data.results.slice(0,10)
        return (
            <div>
                <div className="row">
                    <div className={`col-md-4 d-flex flex-column justify-content-center`}>
                    <h2 className="mb-2">Hi {name}</h2>
                    <h3 className={style.typeHeader}>Trending TV</h3>
                    <p className={`${style.desc} ps-3`}>
                    The latest trending TV captivates audiences with its gripping storyline, stunning visuals, and stellar performances, earning rave reviews and dominating box offices worldwide. Don't miss it!
                    </p>
                    </div>
                    {movies.map((movie) => (
                        <div key={movie.id} className="col-md-2">
                            <img className="w-100 rounded" src={prefixImg + movie.poster_path} alt={movie.name} onClick={()=>navigate(`/single/tv/${movie.id}`)}/>
                            <h3 className="my-2">{movie.name}</h3>
                            <p>{`${movie.overview.slice(0,50)}...`}</p>
                        </div>
                    ))}
                </div>
            </div>)
    }
}

export default TrendingTV