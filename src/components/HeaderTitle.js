import React from 'react'
import { Text } from '../shared/Shared'
import { Colors, FontSizes } from '../styles/inlineStyles'
import '../styles/headerTitle.css'


/**
 * @param {string} title title text to display
 * @param {string[]} subTitle extra text to display for a subTitle. Each line will display a string of the array
 * */
export default ({ title, subTitle, }) => (
    <div id='header-title-wrapper'>
        <Text 
            text={title} 
            fontSize={FontSizes.largeText} 
            color={Colors.black} 
            style={{ position: 'absolute', left: 0, top: 0 }}
        />
        
        <div className='sub-title' >
            {
                subTitle ? 
                    subTitle.map((item, index) => (
                        <Text 
                            key={item + index}
                            text={item} 
                            fontSize={18}
                            color={Colors.black}
                            style={{ 
                            
                            }}
                        />
                    )) : null
            }
        </div>

    </div>
)