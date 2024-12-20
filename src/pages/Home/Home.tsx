import TrendingMovie from "../../components/TrendingMovie/TrendingMovie"
import TrendingTV from "../../components/TrendingTv/TrendingTv"

function Home() {

  return (
<>
<section>
  <TrendingMovie/>
  <hr/>
  <TrendingTV/>
</section>
</>
  )
}

export default Home