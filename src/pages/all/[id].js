import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from '../cssfiles/Single.module.css'

export default function AllPage() {
  const router = useRouter()
  const id = parseInt(router.query.id)

  const [ image, setImage ] = useState([])

  useEffect(() => {
    async function fetchData() {
      if( localStorage.getItem("auth") != 1){
        router.push(`/`)
      }
    }
    fetchData()

    var images = JSON.parse(localStorage.getItem("images"))
    if(images) {
      images.map(image => {
        if(image.imageID == id)  
          setImage(image)
      })
    }
  }, [id])

  var displayImage = image ? <ImageCard image={image}/> : <h1>Image not found with id: {id}</h1>
  return (
    
    <div className={styles.soloBack} >
      <div style={{'transition-timing-function': 'ease-in-out', 'min-height' : '92.4vh'}} >
      <Navbar/>
          {displayImage}
          </div>
      <Footer/>
    </div>
  )
}


function ImageCard({image}) {
    return (
      <div className={styles.soloImageCard}  >
          <h1>{image.description}</h1>
          <img key={image.imageID} src={image.imageLink} />
      </div>
    )
}