import React from 'react'
import Text from './Text'
import { Colors } from '../style/inlineStyles'
import '../style/closeButton.css'
import Close from '../assets/close@2x.png'

/**
 * @param {function} onClick clicking on the button
 * @param {number} radius the radius of the button
 * @param {boolean} showHideText whether to show the "hide" text
 */
export default ({ onClick, radius, style, showHideText }) => (
    <div onClick={onClick} id="close-btn" style={{ ...style, height: radius, width: radius }}>
        {
            showHideText ? 
                (
                    <div id="hide-text">
                        <Text color={Colors.lightGrey} text={'Hide'} />
                    </div>
                ) : null 
        }
        <div id="close-icon-wrapper" style={{ height: radius, width: radius }}>
            <img src={Close} alt="Close button" />
        </div>
    </div>
)