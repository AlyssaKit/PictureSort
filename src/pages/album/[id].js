import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShowImages from '@/components/ShowImages'
import style from '../cssfiles/Albums.module.css'

export default function AlbumPage() {
  const router = useRouter()
  const [ user, setUser ] = useState({})
  const [ allImages, setAllImages ] = useState([])
  const id = router.query.id

  useEffect(() => {
    async function fetchData() {
      if( localStorage.getItem("auth") != 1){
        router.push(`/`)
      }
    }
    fetchData()
    
    let albums = JSON.parse(localStorage.getItem("albums"))
    if (albums) {
        for (let album of albums) {
          if (album.albumName === id) {
            setAllImages(album.images)
            break
          }
        }
    }
  }, [id])

  return (
    <div class={style.albums}>
      <div className={style.contents}  style={{ 'background-color': 'rgba(180, 243, 175, 0.363)', 'min-height' : '92.4vh'}}>
      <Navbar/>
      <h1>Album {id}</h1>
      <ShowImages images={allImages} />
      </div>
      <Footer/>
    </div>
  )
}