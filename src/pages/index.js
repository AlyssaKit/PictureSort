import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import styles from './cssfiles/Home.module.css'
import GitHubLoginLink from '../components/GitHubLoginLink';


export default function Home() {
    const router = useRouter();
    const [ error, setError ] = useState("");
  
    useEffect(() => {
      async function exchangeForAccessToken(code) {
        const res = await fetch('/api/tokenExchange', {
          method: 'POST',
          body: JSON.stringify({
            code: code
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const resBody = await res.json();
        if (res.status !== 200) {
          setError(resBody.err)
        } else {
          console.log("== Auth succeeded!", resBody);
          localStorage.setItem("auth", 1);
          router.push(`/all`)
        }
      }
  
      if (router.query.code) {
        exchangeForAccessToken(router.query.code);
      }
    }, [ router.query.code ]);

    return (
      <div className={styles.backgroundAndfont}>
          <div className={styles.loginContents}>
          <div className={styles.loginBox}>
            <h1> Pixzels</h1>
            <GitHubLoginLink />
          </div>
        </div>
        <Footer className={styles.loginFooter}/>
      </div>
    )
}
