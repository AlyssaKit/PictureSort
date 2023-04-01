import React from 'react'
import { useState } from 'react'
import {FaTags} from "react-icons/fa";
import Link from 'next/link'
import styles from './TagDropdown.module.css'


function TagDropdown({ tags }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className={styles.dropdown}>
            {open && 
                <div className={styles.menu}>
                    {tags.map(tag => (
                        <Link href={`/tag/${tag}`} className={styles.menuitem}>{tag} </Link>
                    ))}
                </div>
            }
            <button onClick={handleOpen} className={styles.dropBut}>Tags <FaTags/></button>
        </div>
    )
}

export default TagDropdown