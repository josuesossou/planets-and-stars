import React from 'react'
import Text from './Text'
import { Colors } from '../style/inlineStyles'

/**
 * @param {function} onClick on click function
 * @param {string} text text of button
 * @param {string} type type of button. Values dumb, normal,or black
 * @param {object} textStyle style of the text
 * @param {boolean} capitalize whether to capitalize the text or not
 * @param {boolean} disabled whether to disable the button
 */
export default ({ onClick, text, type, textStyle, capitalize, style, disabled }) => (
    <div>
        {
            type === 'dumb' ?
                (
                    <button style={{ ...style, ...styles.borderStyle, borderColor: Colors.black }}>
                        <Text color={Colors.black} style={textStyle} capitalize={capitalize} text={text} />
                    </button>
                ) : null        
        }

        {
            type === 'normal' ?
                (
                    <button onClick={onClick} style={{ ...style, ...styles.borderStyle, borderColor: disabled ? Colors.lightGrey : Colors.black}}>
                        <Text color={disabled ? Colors.lightGrey : Colors.black} style={textStyle} capitalize={capitalize} text={text} />
                    </button>
                ) : null
        }

        {
            type === 'black' ? 
                (
                    <button onClick={onClick} style={{ ...style, ...styles.blackBackground, backgroundColor: disabled ? Colors.lightGrey : Colors.black }}>
                        <Text color={Colors.white} style={textStyle} text={text} />
                    </button>
                ) : null
        }
    </div>
)

const styles = {
    borderStyle: {
        border: '2px solid',
        outline: 'none',
        borderRadius: 0,
        backgroundColor: '#ffffff',
    },

    blackBackground: {
        outline: 'none',
        borderRadius: 0,
        backgroundColor: '#000000',
    }
}