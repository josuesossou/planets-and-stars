import React from 'react'
import { Text, Link } from '../shared/Shared'
import { Colors, FontSizes } from '../styles/inlineStyles'
import ChooseMode from './ChooseMode'


/**
 * Handles picking modes
 * @param {string} mode mode the user choose
 * */
export default ({ setMode }) => {
    const [mode, changeMode] = React.useState('Solar System')
    const [showModeOption, setModeOption] = React.useState(false)
    const [clicked, changeClicked] =  React.useState(1)

    const chooseMode = (value, index) => {
        setMode(value)
        changeMode(value)
        changeClicked(index)
        setModeOption(false)
    }

    return (
        <div>
            <Text text={'Mode'} fontSize={FontSizes.largeText} color={Colors.grey} />
            <br />

            <Link 
                text={mode} 
                capitalize
                color={Colors.black}
                style={{ 
                    borderBottom: `2px solid ${Colors.black}`,
                    width: 'fit-content',
                    height: 30,
                    cursor: 'default'
                }}
                onClick={() => setModeOption(true)}
                disabled
            />

            {/* {
                showModeOption ? (
                    <div>        
                        <br />
                        <br />  
                        <ChooseMode chooseMode={chooseMode} clicked={clicked} /> 
                        <br />
                        <br />
                    </div>
                ): null
            } */}
            
        </div>
    )
}