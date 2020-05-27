import React from 'react'
import { Text, Select, Input } from '../shared/Shared.js'
import { Colors } from '../styles/inlineStyles'
import '../styles/scale.css'

export default ({ selectOnChange, inputOnChange }) => (
    <div id="scale-wrapper">
        <Text text={'Scale'} fontSize={24} color={Colors.grey} />
        <br />
        <div style={{ display: 'flex'}}>
            <Select style={{ flex: 2, marginRight: 10 }} onChange={selectOnChange} options={['Up', 'Down']} />
            <Input type="number" onChange={inputOnChange} style={{ flex: 1, marginLeft: 10 }}  />
        </div>
    </div>
)