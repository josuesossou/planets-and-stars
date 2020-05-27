import React from 'react'
import { Text, CloseButton } from '../shared/Shared'
import '../styles/alertMessage.css'
import '../styles/styles.css'

/**
 * @param {string} message the message to display
 * @param {function} onClick close function
 * @param {boolean} close if true close the alert
 */
export default ({ message }) => {
    const color = 'black'
    const [show, changeShow] =  React.useState(true)
    const [close, changeClose] = React.useState('alert-message-show')

    setTimeout(() => {
        changeClose('alert-message-hide')
    } , 5000)

    setTimeout(() => {
        changeShow(false)
    } , 5500)

    const closeCallback = () => {
        changeClose('alert-message-hide')
        clearTimeout()

        setTimeout(() => changeShow(false), 500)
    }

    return (
        show ? (
            <div id='alert-message' className={`background-white ${close}`}>
                <Text text={message} color={color} />
                <CloseButton showHideText={false} radius={30} onClick={closeCallback} style={{ position: 'absolute', right: -10, top: -10 }} />
            </div>
        ) : null
    )
}