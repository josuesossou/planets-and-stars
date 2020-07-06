import React from 'react'
import { Input, Button, Text } from '../shared/Shared'
import { SUBSCRIPTION_AGREEMENT_TEXT } from '../styles/strings'
import { Colors, FontSizes } from '../styles/inlineStyles.js'
import '../styles/enterCardInfo.css'

/**
 * handles the card info inputs
 * @param {string} type whether it is a login or sign up
 */

export default ({ onSubmit }) => {
    const [zipCode, setZipCode] =  React.useState('')
    const [cardNumber, setCardNumber] = React.useState('')
    const [expirationDate, setExpirationDate] = React.useState('')
    const [securityCode, setSecurityCode] =  React.useState('')

    const data = {
        zipCode,
        cardNumber,
        expirationDate,
        securityCode
    }

    const submitForm = () => {
        // !firstName || firstName.includes('<\*>') setFirstNameError('Please ')
        onSubmit(data)
    }

    return (
        <div id='card-info-wrapper'>

            <Input 
                borderColor={Colors.grey} 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                type="number" 
                placeholder="Billing Zip Code" 
                onChange={(text) => setZipCode(text)} 
            />

            <Input 
                borderColor={Colors.grey} 
                type="number" 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                placeholder="Card Number" 
                onChange={(text) => setCardNumber(text)} 
            />
            
            <Input 
                borderColor={Colors.grey} 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                type="number" 
                placeholder="Expiration Date (MM/YY)" 
                onChange={(text) => setExpirationDate(text)} 
            />

            <Input 
                borderColor={Colors.grey} 
                type="number" 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                placeholder="Security Code (CVV)" 
                onChange={(text) => setSecurityCode(text)} 
            />

            <Text fontSize={FontSizes.smallText} text={SUBSCRIPTION_AGREEMENT_TEXT} color={Colors.grey} />
            <br />
            <br />
            
            <Button
                type="black"
                text="Start Subscription"
                onClick={submitForm}
                style={{ height: 45, fontWeight: 'bold' }}
            />

        </div>
    )
}