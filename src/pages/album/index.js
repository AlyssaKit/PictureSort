import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShowAlbums from '@/components/ShowAlbums'
import style from '../cssfiles/Albums.module.css'


function Album() {
    const router = useRouter()
    const [ user, setUser ] = useState({})
    const [ allAlbums, setAllAlbums ] = useState([])

    useEffect(() => {
        async function fetchData() {
            if( localStorage.getItem("auth") != 1){
                router.push(`/`)
            }
        }
        fetchData()

        let albums = JSON.parse(localStorage.getItem("albums"))
        if (albums) {
            setAllAlbums(albums)
        }
    }, [])
    
    return (
        <div className={style.albums}>
            <div className={style.contents}  style={{ 'background-color': 'rgba(180, 243, 175, 0.363)', 'min-height' : '92.4vh'}}>
                <Navbar/>
                <h1 className={style.title}>All Albums</h1>
                <ShowAlbums albums={allAlbums}/>
            </div>
            <Footer/>
        </div>
    )
}

export default Album