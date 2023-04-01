import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './cssfiles/Navbar.module.css'
import { FaPagelines } from "react-icons/fa";
import { SlMenu, SlPicture } from 'react-icons/sl';
import { IoImagesSharp } from "react-icons/io5";
import { BsPersonFillGear} from "react-icons/bs";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const [list, setOpen] = React.useState(false)
    const [ inputQuery, setInputQuery ] = useState("")
    const ref = useRef(null);
    const notify = () => toast("Please enter a tag...", {
      position: toast.POSITION.TOP_CENTER
    });
    const router = useRouter();

    async function logoutAuth(){
        localStorage.setItem("auth", 0);
        router.push(`/`)
    }
    useEffect(() => {
        async function fetchData() {
        if( localStorage.getItem("auth") != 1){
            router.push(`/`)
        }
        }
        fetchData();
    }, []);
    const handleOpen = (e) => {
      console.log("== ref.current:", ref.current)
        if(!ref.current){
            setOpen(false);
        }
        setOpen(!list);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!inputQuery) {
          notify();
          return 
        }
        router.push(`/tag/${inputQuery.toLocaleLowerCase()}`)
    }


    return (
        <>
        <div className={styles.navbar}>
            <button className={styles.navButton} onClick={handleOpen} ><SlMenu/></button>
            <span className={styles.webTitle}>  Pixzels <FaPagelines/></span>
            <form onSubmit={handleSubmit} className={styles.searching} >
                <input type="text" 
                  placeholder="Search..." 
                  className={styles.searchBar} 
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}/>
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
      </div>
      <br/><br/>
      <div >
      {list ? (
        <div className={styles.list} ref={ref} >
            <Link href="/all"><button className={styles.navButton} onClick={handleOpen}><SlPicture/> All Images</button></Link>
            <Link href="/album"><button className={styles.navButton} onClick={handleOpen}><IoImagesSharp/> Albums</button></Link>
            <Link href="/"><button className={styles.navButton} onClick={logoutAuth}><BsPersonFillGear/> Logout</button></Link>
        </div>
      ) : null}
      </div>
      <ToastContainer />
      </>
    )
}

export default Navbar