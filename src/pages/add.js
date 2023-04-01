import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'


function Add() {
    const router = useRouter()
    const [ user, setUser ] = useState({})

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
    }, [])
    
    return (
        <>
            <Navbar/>
                <h1>Add Images</h1>
            <Footer/>
        </>
    )
}

export default Add