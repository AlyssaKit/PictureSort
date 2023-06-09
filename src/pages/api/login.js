import { generateAuthToken, setAuthCookie } from '@/lib/auth'

import USER from '@/data/user'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send({ err: "Only POSTs are accepted here" })
    }
    const { username, password } = req.body
    if (password === USER.password && username === USER.username) {
        console.log("Authenticated and handled");
        setAuthCookie(res, generateAuthToken(username))
        res.status(200).send({ msg: "OK!" })
    }  else {
        console.log("Invalid Credentials");
        res.status(401).send({ err: "Invalid credentials" })
    }
}
