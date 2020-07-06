import React from 'react'
import { Input, Button, Text } from '../shared/Shared'
import { SIGN_UP_AGREEMENT_TEXT } from '../styles/strings'
import { Colors, FontSizes } from '../styles/inlineStyles.js'
import '../styles/authentication.css'

/**
 * handles the sign up and login process
 * @param {string} type whether it is a login or sign up
 */

export default ({ type, onSubmit }) => {
    const [firstName, setFirstName] =  React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] =  React.useState('')

    const data = {
        firstName,
        lastName,
        email,
        password
    }

    const submitForm = () => {
        // !firstName || firstName.includes('<\*>') setFirstNameError('Please ')
        onSubmit(data)
    }

    return (
        <div id='authentication-wrapper'>
            {
                type !== 'Login' ? 
                    (<div className='name-text-fields'>
                        <Input
                            borderColor={Colors.grey} 
                            style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                            type="text" 
                            placeholder="First Name" 
                            onChange={(text) => setFirstName(text)} 
                        />
                        <Input 
                            borderColor={Colors.grey} 
                            type="text" 
                            style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                            placeholder="Last Name" 
                            onChange={(text) => setLastName(text)} 
                        />
                    </div>) : null
            }
            <Input 
                borderColor={Colors.grey} 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                type="email" 
                placeholder="Email Address" 
                onChange={(text) => setEmail(text)} 
            />
            <Input 
                borderColor={Colors.grey} 
                type="text" 
                style={{ borderWidth: 1, height: 40, marginBottom: 30 }}
                placeholder="Password" 
                onChange={(text) => setPassword(text)} 
            />

            <Button 
                type="black" 
                text={"Create Account"}
                onClick={submitForm} 
                style={{ height: 45, fontWeight: 'bold', marginBottom: type !== 'Login' ? 20 : 0 }}
            />
            {
                type !== 'Login' ?
                (
                    <Text fontSize={FontSizes.smallText} text={SIGN_UP_AGREEMENT_TEXT} color={Colors.grey} />
                ) : null
            }
            
        </div>
    )
}