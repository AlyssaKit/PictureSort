/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react"
import useImageLabeling from '../hooks/useImageLabeling';
import styles from './cssfiles/AddImage.module.css'
import {BsCloudUploadFill} from 'react-icons/bs'
import { CSSTransition, TransitionGroup } from "react-transition-group"
import Spinner from "./Spinner";

function AddImage({ onUpload }) {
  const [ userInput, setUserInput ] = useState('')
  const [ image, setImage ] = useState('')
  const [ labels, loading, error ] = useImageLabeling(image)

  const handleInputChange = (event) => {
    console.log("inputChange===", event.target.value)
    setUserInput(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setImage(userInput)
    setUserInput('')
  }

  useEffect(() => {
    if (labels != null) {
      const imageTags = labels.tags.map((imageTag) => imageTag.name);
      //onUpload({image: image, description: labels.description.captions[0].text })
      var currentImages = JSON.parse(localStorage.getItem("images"))
      if (currentImages){
        currentImages.push({imageID: currentImages.length, imageLink: image, description: labels.description.captions[0].text, tags: imageTags})
        currentImages = JSON.stringify(currentImages)
        localStorage.setItem("images", currentImages)
      }
      else{
        currentImages = JSON.stringify([{imageID: 0, imageLink: image, description: labels.description.captions[0].text, tags: imageTags}])
        localStorage.setItem("images", currentImages)
      }
      onUpload()
      //to get the list of images from local storage do JSON.parse(localStorage.getItem("images"))
      var albums = JSON.parse(localStorage.getItem("albums"))
      let foundAlbum = false
      if (albums) {
        for (let album of albums) {
          if ([imageTags[0], imageTags[1], imageTags[2]].includes(album.albumName)) {
            album.images.push({imageID: JSON.parse(localStorage.getItem("images")).length - 1, imageLink: image, description: labels.description.captions[0].text, tags: imageTags})
            albums = JSON.stringify(albums)
            localStorage.setItem("albums", albums)
            foundAlbum = true
            break
          }
        }

        if (!foundAlbum) {
          albums.push({albumName: imageTags[0], images: [{imageID: JSON.parse(localStorage.getItem("images")).length - 1, imageLink: image, description: labels.description.captions[0].text, tags: imageTags}]})
          albums = JSON.stringify(albums)
          localStorage.setItem("albums", albums)
        }
      }
      else {
        albums = JSON.stringify([{albumName: imageTags[0], images: [{imageID: JSON.parse(localStorage.getItem("images")).length - 1, imageLink: image, description: labels.description.captions[0].text, tags: imageTags}]}])
        localStorage.setItem("albums", albums)
      }
    }
  }, [labels])


  return (
    <div className={styles.addContents}>
      <TransitionGroup>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" value={userInput} onChange={handleInputChange} className={styles.input} placeholder="Enter Image Link" />
        <button type="submit" className={styles.upload}><BsCloudUploadFill/></button>
      </form>
      </TransitionGroup>
      {loading && <Spinner />}
      {error && <p style={{color: 'white'}}>Error analyzing image.</p>}
    </div>
  )
}

export default AddImage