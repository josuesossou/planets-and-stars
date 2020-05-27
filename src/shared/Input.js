import React from 'react'
import { Colors } from '../style/inlineStyles'

/**
 * @param {string} type input type
 * @param {string}  value input value
 * @param {function} onChange callback event when the value is changed
 * @param {string} placeholder placeholder text of the input
 * @param {boolean} disabled whether to disable the input
 */
export default ({ type, value, onChange, placeholder, disabled, style }) => (
    <div style={{ ...style, ...styles.wrapperStyle, borderColor: disabled ? Colors.lightGrey : Colors.black }}>
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            disabled={disabled} 
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