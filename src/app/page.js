'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import AnimeSeasonsCard from "./components/AnimeSeasonsCard"
import Link from "next/link"
import AnimeCards from "./components/AnimeCard"
import AnimeReviews from "./components/AnimeReviews"
import Loading from "./components/Loading"

const getApi = async(path) => {  
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`)
  return response
}

export default function Home() {
  const [currentSeasonAnime, setCurrentSeasonAnime] = useState([])
  const [upcomingAnime, setUpcomingAnime] = useState([])
  const [topAnime, setTopAnime] = useState([])
  const [animeReview, setAnimeReview] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [topAnimePagination, setTopAnimePagination] = useState(0)

  useEffect(()=>{
    getApi('/seasons/now?limit=5&&filter=tv')
    .then(data=>{
      setCurrentSeasonAnime(()=>{
        return data.data.data.filter(value=>value.type === 'TV').map(values=>{
          return {
            mal_id: values.mal_id,
            image_url: values.images.webp.image_url,
            score: values.score,
            title: values.title
          }
        })
      })
    })
    .catch(setCurrentSeasonAnime([]))
  }, [])

  useEffect(()=>{
    if (currentSeasonAnime.length > 0) { 
      const upcoming = setTimeout(() => {
      getApi('/seasons/upcoming?limit=5&&filter=tv')
      .then(data=>{
        setUpcomingAnime(()=>{
          return data.data.data.filter(value=>value.type === 'TV').map(values=>{
            return {
              mal_id: values.mal_id,
              image_url: values.images.webp.image_url,
              type: values.type,
              rating: values.rating,
              title: values.title,
              popularity: values.popularity,
              section: 'upcoming'
            }
          })
        })
      })
      .catch(setUpcomingAnime([]))
    }, 1000);

    return () => clearTimeout(upcoming)
    }
  }, [currentSeasonAnime])

  useEffect(()=>{
    if (upcomingAnime.length > 0) {
      const tAnime = setTimeout(()=>{
        getApi('/top/anime?limit=5')
        .then(data=>{
          setTopAnime(()=>{
            return data.data.data.filter(value=>value.type === 'TV').map(values=>{
              return {
                mal_id: values.mal_id,
                image_url: values.images.webp.image_url,
                rating: values.rating,
                title: values.title,
                score: values.score,
                popularity: values.popularity,
                section: 'top'
              }
            })
          })
          setTopAnimePagination(data.data.pagination.last_visible_page)
        })
        .catch(setTopAnime([]))
      }, 1000)

      return () => clearTimeout(tAnime)
    }
  }, [upcomingAnime])

  useEffect(()=>{
    if (topAnime.length > 0) {
      const reviewAnime = setTimeout(()=>{
        getApi('/reviews/anime?preliminary=false')
        .then(data=>{
          setAnimeReview(()=>{
            return data.data.data.filter(value=>!value.is_preliminary).map(values=>{
              return {
                mal_id: values.mal_id,
                title: values.entry.title,
                image_url: values.entry.images.webp.image_url,
                score: values.score,
                review: values.review,
                tags: values.tags[0],
                username : values.user.username,
                userProfile : values.user.images.webp.image_url
              }
            }).slice(0,5)
          })
        })
        .catch(setAnimeReview([]))
      }, 1000)

      return () => clearTimeout(reviewAnime)
    }
  }, [topAnime])

  const [randomAnimes, setRandomAnimes] = useState([])

  useEffect(()=>{
    if (animeReview.length > 0) {
      const random = setTimeout(()=>{
        const randomNumber = Math.round(Math.random() * 1032)
        console.log(randomNumber, topAnimePagination)
        getApi(`/top/anime?page=${randomNumber}&swf=true`)
        .then(data=>{
          setRandomAnimes(()=>{
            return data.data.data.filter(value=>value.type === 'TV').map(values=>{
              return {
                mal_id: values.mal_id,
                image_url: values.images.webp.image_url,
                rating: values.rating,
                title: values.title,
                score: values.score,
                popularity: values.popularity,
                section: 'top'
              }
            }).slice(0,5)
          })
          setIsLoading(false)
        })
        .catch(setRandomAnimes([]))
      }, 1000)

      return () => clearTimeout(random)
    }
  }, [animeReview])
  return (
    <>
    {
      isLoading ? 
      <Loading />
      :
      <main className="max-w-7xl mx-auto w-full bg-white">
        <section className="w-full flex flex-col gap-3 md:flex-row">
          <section className="w-full p-3 md:w-3/5">
            <section className="w-full">
              <div className="flex justify-between items-center py-2">
                <h3 className="text-xl font-semibold">Current Seasons's Animes</h3>
                <Link href={'/'}><p className="text-sm text-blue-400">View more</p></Link>
              </div>
              <div className="w-full space-y-3 overflow-x-auto">
                <div className="w-fit mx-auto flex gap-5">
                {
                  currentSeasonAnime.map(values=>(
                      <AnimeSeasonsCard
                        key={values.mal_id}
                        values={values} 
                      />
                    ))
                  }
                </div>
              </div>
            </section>
            <section className="w-full">
              <div className="flex justify-between items-center py-2">
                <h3 className="text-xl font-semibold">Last Anime Review </h3>
              </div>
              <div className="w-full space-y-3 overflow-x-auto">
                <div className="w-full mx-auto flex flex-col gap-5">
                {
                  animeReview.map(values=>(
                      <AnimeReviews
                        key={values.mal_id}
                        values={values}/>
                    ))
                  }
                </div>
              </div>
            </section>
          </section>
          <section className="w-full bg-white md:w-2/5">
            <section className="w-full bg-primary p-3">
              <div className="flex justify-between items-center py-2">
                <h3 className="text-xl font-semibold text-white">Upcoming Animes</h3>
                <Link href={'/upcoming'}><p className="text-sm text-blue-200">View more</p></Link>
              </div>
              {
                upcomingAnime.map(values=>(
                  <AnimeCards
                  key={values.mal_id}
                  values={values} />
                ))
              }
            </section>
            <section className="w-full bg-slate-600 p-3">
              <div className="flex justify-between items-center py-2">
                <h3 className="text-xl font-semibold text-white">Top Animes</h3>
                <Link href={'/topanime'}><p className="text-sm text-blue-200">View more</p></Link>
              </div>
              {
                topAnime.map(values=>(
                  <AnimeCards
                  key={values.mal_id}
                  values={values} />
                ))
              }
            </section>
          </section>
        </section>
        <section className="bg-black text-white p-3 space-y-3">
          <h3 className="text-xl font-semibold text-white">Random animes for your weekend !</h3>
          <div className="grid grid-cols-2 gap-3 mx-auto md:grid-cols-5">
              {
              randomAnimes.map(values=>(
                <Link href={`/anime/${values.mal_id}`} key={values.mal_id}>
                  <AnimeSeasonsCard
                  values={values} />
                </Link>
              ))
              }
          </div>
        </section>
      </main>
    }
    </>
  )
}
