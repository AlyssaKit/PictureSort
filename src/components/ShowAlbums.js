import React from 'react'
import Link from 'next/link'
import styles from './cssfiles/ShowImages.module.css'

function ShowAlbums({ albums }) {
    return (
        <div className={styles.imagegrid}>
           {albums.map((album, index) => (
                <div className={styles.imageCard}>
                    <Link href={`/album/${album.albumName}`}><img key={index} src={album.images[0].imageLink} className={styles.image} /></Link>
                    <p>{album.albumName}(s)</p>
                </div>
            ))}
        </div>
    )
}

export default ShowAlbums