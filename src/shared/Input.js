import React from 'react'
import { Colors } from '../styles/inlineStyles'

/**
 * @param {string} type input type
 * @param {string}  value input value
 * @param {function} onChange callback event when the value is changed
 * @param {string} placeholder placeholder text of the input
 * @param {boolean} disabled whether to disable the input
 * @param {number} min if type is number, this represents the minimum value allowed
 * @param {number} max if type is number, this represents the maximum value allowed
 */
export default ({ type, value, onChange, placeholder, disabled, style, min, max, }) => (
    <div style={{ ...style, ...styles.wrapperStyle, borderColor: disabled ? Colors.lightGrey : Colors.black, padding: 5 }}>
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            disabled={disabled}
            min={min}
            max={max}
            style={{ ...styles.inputStyle, borderColor: disabled ? Colors.lightGrey : Colors.black }} 
        />  
    </div>
)

const styles = {
    inputStyle: {
        outline: 'none',
        border: '0',
        borderRadius: 0,
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    wrapperStyle: {
        border: '2px solid',
        borderRadius: 0
    }
}