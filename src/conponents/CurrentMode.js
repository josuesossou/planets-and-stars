import React from 'react'
import { Text } from '../shared/Shared'
import { Colors } from '../styles/inlineStyles'


/**
 * @param {string} mode mode the user choose
 * */
export default ({ mode }) => (
    <div>
        <Text text={'Current Mode'} fontSize={24} color={Colors.grey} />
        <br />
        <Text 
            text={mode} 
            capitalize
            color={Colors.orange}
            style={{ 
                border: `2px solid ${Colors.orange}`,
                padding: 10,
                width: '100%',
                height: 40,
                display: 'flex',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        />
    </div>
)