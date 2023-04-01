import React from 'react'
import Link from 'next/link'
import styles from './cssfiles/ShowImages.module.css'
import {FaTags} from "react-icons/fa";
import {ImPriceTags} from "react-icons/im";

import TagDropdown from './TagDropdown';

function ShowImages({ images }) {
    return (
        <div className={styles.imagegrid}>
            {images.map((image, index) => (
                <div className={styles.imageCard} style={{'transition-timing-function': 'ease-in-out'}}>
                    <Link href={`/all/${image.imageID}`} className={styles.noHide}>
                        <div>
                            <img key={index} src={image.imageLink} className={styles.image} />
                            <p>{image.description}
                            </p>
                        </div>
                    </Link>
                    <div className={styles.hide}>
                    <TagDropdown tags={image.tags}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowImages