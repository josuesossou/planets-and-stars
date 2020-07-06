import React from 'react'
import { Link, Text } from '../shared/Shared'
import { SUBSCRIPTION_AGREEMENT_TEXT } from '../styles/strings'
import { Colors, FontSizes } from '../styles/inlineStyles.js'
import '../styles/loginSignup.css'

/**
 * handles the card info inputs
 * @param {string} type whether it is a login or sign up
 */

export default ({ isLoggedIn, onLoginClick, onSignUpClick, onLogoutClick, onAccountClick  }) => !isLoggedIn ? (
    <div id='login-signup-wrapper-false'>
        
        <Link
            type="normal"
            text="Login"
            onClick={onLoginClick}
            style={{ fontSize: FontSizes.smallText, border: 0, marginRight: 10 }}
        />

        <Link
            type="normal"
            text="Sing Up"
            onClick={onSignUpClick}
            style={{ fontSize: FontSizes.smallText, border: 0, marginLeft: 10 }}
        />

    </div>
) : (
    <div id='login-signup-wrapper-true'>
        
        <Link
            type="normal"
            text="Logout"
            onClick={onLogoutClick}
            style={{  fontSize: FontSizes.smallText, border: 0 }}
        />

        <Link
            type="normal"
            text="Account"
            onClick={onAccountClick}
            style={{ fontSize: FontSizes.smallText, border: 0 }}
        />
        
        <Text text={'josuesossou'} style={{ fontSize: FontSizes.smallText }} color={Colors.lightGrey} />

    </div>
)
