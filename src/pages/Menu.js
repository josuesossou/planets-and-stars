import React from 'react'
import { CloseButton } from '../shared/Shared'
import { CurrentMode, Scale, LoginSignupButtons } from '../components/Components'
import '../styles/menu.css'


export default ({ chooseMode, changeShow, show }) => {
    const [close, changeClose] = React.useState('menu-show') // fade out animation when closed

    const closeCallback = () => {
        changeClose('menu-hide')
        clearTimeout()

        setTimeout(() => {
            changeShow(false)
            changeClose('menu-show')
        }, 500)
    }


    return show ? (
        <div id="menu" className={close}>
            <br />
            <LoginSignupButtons />
            <br />
            <br />

            <CurrentMode setMode={chooseMode} />
            <br />
            <br />

            <div className="scale-modifiers-wrapper">
                <Scale min={1} max={20} title='Size'/>
                <Scale min={1} max={20} title='Speed' />
            </div>
            <br />
            <br />

            <CloseButton radius={30} style={{ position: 'relative', alignSelf: 'flex-end' }} showHideText onClick={closeCallback} />
        </div>
    ) : null
}