import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

function Create() {
    const router = useRouter();
    async function logoutAuth(){
        localStorage.setItem("auth", 0);
        router.push(`login`)
    }
    useEffect(() => {
        async function fetchData() {
        if( localStorage.getItem("auth") != 1){
            router.push(`/login`)
        }
        }
        fetchData();
    }, []);

    return (
        <div>
        <h1>Logged In!</h1>
        <button onClick={logoutAuth}> Logout</button>
        </div>
    );
}

export default Create
