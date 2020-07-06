import React from 'react';
import '../styles/link.css'

/**
 * @param {string} text the text to display
 * @param {boolean} capitalize whether to capitalize
 * @param {string} color in hex value or the name of the color
 * @param {number} fontSize the font size
 * @param {object} style the style of the text
 */
export default ({ text, capitalize, fontSize, color, style, onClick, disabled  }) => {
    const [effect, changeEffect] = React.useState('link-on-click-effect-fade-in')

    const mousedown = () => {
        changeEffect('link-on-click-effect-fade-out')
        
    }
    const mouseup = () => {
        changeEffect('link-on-click-effect-fade-in')
        onClick()
    }
    return (
        <div id='link-text'>
            <div 
                style={{ fontSize, color, cursor: 'pointer', ...style }}             
                onMouseDown={disabled ? null : mousedown}
                onMouseUp={mouseup} 
                className={effect} 
            >

                {capitalize ? text.toUpperCase() : text}

            </div>
        </div>
    )
}