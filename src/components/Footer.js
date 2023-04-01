import React from 'react'
import style from './cssfiles/Footer.module.css'
import {AiFillGithub} from 'react-icons/ai'
import {IoSchoolOutline} from 'react-icons/io5'
import {HiUserGroup} from 'react-icons/hi'
import { ToastContainer } from 'react-toastify'

function Footer() {

    return (
        <div className={style.footer}>
            Alyssa Kittle | Daniel Garncia | Jonathan Rockett | Derek Renzema | Shreyes Joshi
            <br/>
            <a href="https://github.com/osu-cs494-w23/final-project-image-classifier.git" className={style.footLink}><AiFillGithub/> GitHub <AiFillGithub/></a>  
            <a href="https://oregonstate.edu/" className={style.footLink}><IoSchoolOutline/> Oregon State University <IoSchoolOutline/></a>  
            <a href="https://web.engr.oregonstate.edu/~hessro/teaching/cs494-w23" className={style.footLink}><HiUserGroup/> CS 494 <HiUserGroup/></a> 
        </div>
    )
}

export default Footer