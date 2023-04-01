import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShowImages from '@/components/ShowImages'

import styles from '../cssfiles/Tags.module.css'

export default function AlbumPage() {
  const router = useRouter()
  const [ user, setUser ] = useState({})
  const [ allImages, setAllImages ] = useState([])
  const id = router.query.id

  useEffect(() => {
    async function fetchData() {
      // const token = window.localStorage.getItem("token")
      // console.log("== accessed token:", token)
      const res = await fetch('/api/user', {
          headers: {
              "x-csrf-token": Cookies.get("csrf")
          }
      })
      if (res.status !== 200) {
          router.push(`/login?redirect=${router.asPath}`)
      }
      const body = await res.json()
      setUser(body)
    }
    fetchData()

    let taggedImages = []
    let images = JSON.parse(localStorage.getItem("images"))
    if (images) {
        for (let image of images) {
          if (image.tags.includes(id)) {
            taggedImages.push(image)
          }
        }

        setAllImages(taggedImages)
    }
  }, [id])

  return (
    <div className={styles.tagback}>
      <div style={{ 'min-height' : '92.4vh'}}>
        <Navbar/>
        <h1 className={styles.title}>#{id}</h1>
        <ShowImages images={allImages} />
      </div>
      <Footer/>
    </div>
  )
}