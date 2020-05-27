import React from 'react'
import Text from './Text'
import { Colors } from '../styles/inlineStyles'
import '../styles/button.css'

/**
 * @param {function} onClick on click function
 * @param {string} text text of button
 * @param {string} type type of button. Values custom, normal,or black
 * @param {object} textStyle style of the text
 * @param {boolean} capitalize whether to capitalize the text or not
 * @param {boolean} disabled whether to disable the button
 */
export default ({ onClick, text, type, textStyle, capitalize, style, disabled }) => {
    const [effect, changeEffect] = React.useState('')
    
    return (
        <div
            style={{ 
                ...style, 
                ...styles.borderStyle, 
                borderColor: disabled ? Colors.lightGrey : Colors.black 
            }}      
            onClick={type === 'custom' || disabled ? null : onClick}
            onMouseDown={() => disabled ? null : changeEffect('on-click-effect-fade-in')}
            onMouseUp={() => disabled ? null : changeEffect('on-click-effect-fade-out')}
        >
            <div style={styles.onClickEffectStyle} className={effect}></div>
            <Text color={disabled ? Colors.lightGrey : Colors.black} style={textStyle} capitalize={capitalize} text={text} />
        </div>
    )
}

const styles = {
    borderStyle: {
        position: 'relative',
        border: '2px solid',
        outline: 'none',
        borderRadius: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    onClickEffectStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.lighterGrey, 
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