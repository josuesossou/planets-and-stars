import React from 'react'
import { CloseButton, Button } from '../shared/Shared'
import { CurrentMode, Scale } from '../components/Components'
import '../styles/menu.css'


export default ({ chooseMode, changeShow, show, ignoreDistance, text, changeSpeed, changeSize }) => {
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
            {/* <LoginSignupButtons />
            <br />
            <br /> */}

            <CurrentMode setMode={chooseMode} />
            <br />
            <br />

            <div className="scale-modifiers-wrapper">
                {/* <Scale min={1} max={20} title='Size' inputOnChange={changeSize} /> */}
                {/* <Scale min={1} max={20} title='Speed' inputOnChange={changeSpeed} /> */}
            </div>
            
            <Button 
                text={text} 
                style={{ width: '50%', height: 40 }}
                onClick={ignoreDistance}
            />
            <CloseButton radius={30} style={{ position: 'relative', alignSelf: 'flex-end' }} showHideText onClick={closeCallback} />
        </div>
    ) : null
}