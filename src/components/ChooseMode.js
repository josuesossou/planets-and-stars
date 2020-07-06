import React from 'react'
import { Text, Button } from '../shared/Shared.js'
import { Colors } from '../styles/inlineStyles'
import { SOLAR_SYSTEM, CREATOR, SIMULATION } from '../styles/strings'
import '../styles/chooseMode.css'

export default ({ chooseMode, clicked }) => {
    const onClickHandler = (mode, index) => {
        chooseMode(mode, index)
    }

    return (
        <div id="choose-mode-wrapper">
            <Button 
                onClick={() => onClickHandler(SOLAR_SYSTEM, 1)} 
                text={SOLAR_SYSTEM} 
                disabled={clicked === 1} 
                style={styles.buttonStyle}
                capitalize 
            />
            <Button 
                onClick={() => onClickHandler(CREATOR, 2)} 
                text={CREATOR} 
                disabled={clicked === 2} 
                style={styles.buttonStyle}
                capitalize 
            />
            <Button 
                onClick={() => onClickHandler(SIMULATION, 3)} 
                text={SIMULATION} 
                disabled={clicked === 3} 
                style={styles.buttonStyle}
                capitalize 
            />
        </div>
    )
}

const styles = {
    buttonStyle: {
        width: '100%',
        height: 40,
        marginBottom: 15
    }
}
