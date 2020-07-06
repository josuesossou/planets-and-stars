import React from 'react'
import { ArrowRight } from '../assets/icons/Icons'
import '../styles/showMenu.css'
import '../styles/styles.css'

/**
 * @param {function} onClick close function
 */
export default ({ onClick }) => {

    const closeCallback = () => {
        onClick()
    }

    return (
        <div id='show-menu' className={`background-white`} onClick={closeCallback}>
            <img src={ArrowRight} alt="Arrow right" />
        </div>
    )
}