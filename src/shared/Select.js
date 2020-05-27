import React from 'react'
import { Colors } from '../style/inlineStyles'

/**
 * @param {string} type input type
 * @param {string}  value input value
 * @param {function} onChange callback event when the value is changed
 * @param {string} placeholder placeholder text of the input
 * @param {boolean} disabled whether to disable the input
 * @param {string[]} options options of the select. First option in the array will be set automatically
 */
export default ({ onChange, placeholder, style, options }) => (
    <div style={{ ...style, ...styles.wrapperStyle, borderColor: Colors.black }}>
        <select 
            style={{ ...styles.selectStyle, borderColor: Colors.black }} 
            onChange={onChange}
        >
            {options.map((option, index) => (
                <option key={`${index}`} value={option} style={styles.optionStyle}>{option}</option>
            ))}
        </select>
    </div>
)

const styles = {
    selectStyle: {
        outline: 'none',
        border: '0',
        borderRadius: 0,
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    optionStyle: {
        width: '100%',
        height: '50px',
        backgroundColor: Colors.white,
        color: Colors.black
    },
    wrapperStyle: {
        border: '2px solid',
        borderRadius: 0
    }
}