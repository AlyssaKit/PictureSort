import React from 'react';
import styles from './cssfiles/GitHubLoginLink.module.css'

export default function GitHubLoginLink() {
  const queryParams = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    scope: "user:email"
  })
  const baseUrl = "https://github.com/login/oauth/authorize";
  const url = `${baseUrl}?${queryParams.toString()}`;
  return <a href={url} className={styles.loginBut}>Login with GitHub</a>
}
