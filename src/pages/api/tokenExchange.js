import fetch from 'isomorphic-unfetch';

import {
  generateAuthToken,
  setAuthCookie
} from '../../lib/auth';

export default async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).send({ err: "Must specify authorization code."})
  } else {
    const githubRes = await fetch(
      'https://github.com/login/oauth/access_token',{
        method: 'POST',
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const githubResBody = await githubRes.json();
      if (githubResBody.access_token) {
        // Store access_token in server-side cache (e.g. Redis)
        setAuthCookie(res, generateAuthToken("..."));
        res.status(200).send({ msg: "OK!" });
      } else {
        res.status(401).send({ err: githubResBody.error_description })
      }
  }
}
