import { useEffect, useState} from "react"
import credentials from '../credentials.json'

function useImageLabeling(imageURL) {
    const [ labels, setLabels ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    useEffect(() => {
        let ignore = false
        const controller = new AbortController()

        async function fetchImageLabels() {
            setLoading(true)
            let responseData = null
            try {
                const response = await fetch(`${credentials.ENDPOINT}/vision/v3.2/analyze?visualFeatures=Description,Tags&language=en&model-version=latest`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': credentials.API_KEY
                  },
                  body: JSON.stringify({"url": imageURL})
                },
                { signal: controller.signal }
                )
                
                if (response.status != 200) {
                    console.log("=== status: ", response.status)
                    console.log("=== status: ", response.body)
                    setError(true)
                } else {
                    console.log("=== status: ", response.status)
                    setError(false)
                    responseData = await response.json()
                }
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("HTTP Request Cancelled")
                } else {
                    setError(true)
                    console.error("Error:", e)
                    throw e
                }
            }

            console.log("response data", responseData)
            if (!ignore) {
                setLabels(responseData)
                setLoading(false)
            }
        }

        if (imageURL) {
            fetchImageLabels()
        }
        return () => {
            ignore = true
            controller.abort()
        }
    }, [imageURL])

    return [ labels, loading, error ]
}

export default useImageLabeling