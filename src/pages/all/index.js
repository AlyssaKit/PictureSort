import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShowImages from '@/components/ShowImages'
import AddImage from '@/components/AddImage'
import style from '../cssfiles/AllPictures.module.css'

function All() {
    const router = useRouter()
    const [ user, setUser ] = useState({})
    const [ allImages, setAllImages ] = useState([])

    const getImages = () => {
        var images = JSON.parse(localStorage.getItem("images"))
        if (images) {
            setAllImages(images)
        }
    }

    useEffect(() => {
        async function fetchData() {
            if( localStorage.getItem("auth") != 1){
                router.push(`/`)
            }
        }
        fetchData();
        getImages();
    }, []);




    return (
        <div className={style.allpicback}>
            
            <div className={style.contents}  style={{ 'background-color': 'rgba(180, 243, 175, 0.363)'}}>
                <Navbar/>
                <div className={style.titleContents}>
                    <h1 className={style.title}> All Images </h1>
                </div>
                <AddImage onUpload={getImages} />
                <ShowImages images={allImages}/>
            </div>
            <Footer/>
        </div>
    )
}

export default All