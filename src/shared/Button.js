import React from 'react'
import Text from './Text'
import { Colors } from '../styles/inlineStyles'
import '../styles/button.css'

/**
 * @param {function} onClick on click function
 * @param {string} text text of button
 * @param {string} type type of button. Values normal or black
 * @param {object} textStyle style of the text
 * @param {boolean} capitalize whether to capitalize the text or not
 * @param {boolean} disabled whether to disable the button
 * @param {string} bgColor the background color of the button if it is custom. use this if you want to set a custom background color
 * @param {string} color the color of the button text if it is custom. use this if you want to set a custom button text color
 */
export default ({ onClick, text, type, textStyle, capitalize, style, disabled, bgColor, color, children }) => {
    const [effect, changeEffect] = React.useState('')
    const mousedown = () => {
        changeEffect('on-click-effect-fade-in')
        
    }
    const mouseup = () => {
        changeEffect('on-click-effect-fade-out')
        if (!disabled) onClick()
    }
    
    return (
        <div
            style={{ 
                ...style, 
                ...styles.borderStyle, 
                borderColor: disabled ? Colors.lightGrey : Colors.black,
                backgroundColor: disabled && type === 'black' ? Colors.lightGrey :
                                    type === 'black' ? Colors.black : bgColor || Colors.white,
            }}      
            onMouseDown={mousedown}
            onMouseUp={ mouseup}
        >
            <div 
                style={{
                    ...styles.onClickEffectStyle,
                    backgroundColor: type === 'black' ? Colors.lightWhite : Colors.lighterGrey, 
                }} 
                className={effect}
            ></div>
 
            <Text 
                color={disabled ? Colors.lightGrey : 
                    type === 'black' ? Colors.white : color || Colors.black} 
                style={textStyle} 
                capitalize={capitalize} 
                text={text} 
            />
            {children}
        </div>
    )
}

const styles = {
    borderStyle: {
        position: 'relative',
        border: '2px solid',
        outline: 'none',
        borderRadius: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    onClickEffectStyle: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        outline: 'none', 
        border: 0,
        opacity: 0
    },
    blackBackground: {
        outline: 'none',
        borderRadius: 0,
        backgroundColor: '#000000',
    },
    
}