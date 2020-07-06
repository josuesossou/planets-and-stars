import React from 'react'
import { Input, Button, Text } from '../shared/Shared'
import { SUBSCRIPTION_AGREEMENT_TEXT } from '../styles/strings'
import { Colors, FontSizes } from '../styles/inlineStyles.js'
import { MasterCard, Visa, PayPal, Discover, ArrowRight } from '../assets/icons/Icons'
import '../styles/setPayment.css'

/**
 * handles the card info inputs
 * @param {string} type whether it is a login or sign up
 */

export default ({ enterCard }) => {

    return (
        <div id='set-payment-wrapper'>
            <Button
                type="normal"
                text="Credit or Debit Card"
                fontSize={FontSizes.smallText}
                onClick={enterCard}
                style={{ height: 45, width: '80%', paddingLeft: 15, fontSize: FontSizes.smallText, fontWeight: 'bold' }}
            >
                <div className="children-wrapper">
                    <div className="img-wrapper">
                        <img src={Visa} alt="visa logo"/>
                        <img src={MasterCard} alt="Mastercard logo"/>
                        <img src={Discover} alt="Discover logo"/>
                    </div>

                    <img src={ArrowRight} alt="Arrow right" />
                </div>
                
            </Button>
            <br />
            <br />
            <Button
                type="normal"
                text="PayPal"
                onClick={enterCard}
                style={{ height: 45, width: '80%', paddingLeft: 15, fontSize: FontSizes.smallText, fontWeight: 'bold' }}
            >
                <div className="children-wrapper">
                    <img src={PayPal} alt="PayPal logo"/>
                    <img src={ArrowRight} alt="Arrow right" />
                </div>
            </Button>
        </div>
    )
}