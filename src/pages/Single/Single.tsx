import { Navigate, useParams } from 'react-router-dom'
import { useGetMovieQuery } from '../../store/shows'

function Single() {
    const params= useParams()
    if (params.type === "movie" || params.type === "tv"){
        const { data, error, isLoading } = useGetMovieQuery(`/${params.type}/${params.id}`)
        const prefixImg = "https://image.tmdb.org/t/p/w500/"
        if (isLoading) return <div>isLoading</div>
        if (error) return <div>Error</div>
        if (data) {            
            const single:{id:number, poster_path:string, overview:string, title?:string, name?:string,vote_average:number} = data
            return (<>
              <div className='d-flex justify-content-between'>
                <div className='col-md-5'>
                <img className="w-100 rounded" src={prefixImg + single.poster_path} alt={single.title || single.name} />
                </div>
                <div className='col-md-5 d-flex flex-column justify-content-center'>
                    <h1>{single.title || single.name}</h1>
                    <p>{single.overview}</p>
                    <p>{`Rating: ${single.vote_average}`}</p>
                </div>
            </div>
            </>)
          
        }
    }else{
        <Navigate to={"/notfound"} replace />
    }


}

export default Single