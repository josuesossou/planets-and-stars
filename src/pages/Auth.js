import React from 'react'
import { PlanOffers, Authentication, HeaderTitle, EnterCardInfo, SetPayment } from '../components/Components'
import { STANDARD_TEXT } from '../styles/strings'
import { CloseButton } from '../shared/Shared'
import '../styles/auth.css'

/**
 * This page handles login, sign up, and subscription payment
 * @param {string} authType whether it is a login action or a sign up action
 */
export default ({ authType, show, changeShow }) => {
    const [plan, changePlan] = React.useState('') // plan that the customer picked
    const [headerTitle, changeHeaderTitle] = React.useState({})
    const [showPaymentChoice, changePaymentChoice] = React.useState(false) // show payment choice component
    const [showCardInfo, changeCardInfo] = React.useState(false) // show EnterCardInfo component
    const [showSignup, changeSignup] = React.useState(false)

    const [close, changeClose] = React.useState('auth-show') // fade out animation when closed

    const choosePlan = (plan) => {
        changeSignup(true)
        changePaymentChoice(false)
        changeCardInfo(false)
        changeHeaderTitle({
            title: 'Sign Up',
            subTitle: ['']
        })
        changePlan(plan)
    }

    const submit = (data) => {
        /// do something with data, login or sign up
        if (authType === 'Login' || plan === STANDARD_TEXT) return

        changeSignup(false)
        changePaymentChoice(true)
        changeCardInfo(false)
    }

    const goToEnterCard = () => {
        changeSignup(false)
        changePaymentChoice(false)
        changeCardInfo(true)
    }

    const startSubscription = (card) => {
        // do something with card data
    }
    
    const closeCallback = () => {
        changeClose('auth-hide')
        clearTimeout()

        setTimeout(() => {
            changeShow(false)
            changeClose('menu-show')
        }, 500)
    }

    return show ? (
        <div id="auth-wrapper" className={close}>
            <CloseButton showHideText text='Cancel' radius={30} onClick={closeCallback} style={{ position: 'absolute', right: -10, top: -10 }} />
            {
                /* plans components */
                authType !== 'Login' && plan === '' ? 
                    <PlanOffers onChoosePlan={choosePlan} /> : null
            }

            {
                /* login Component */
                authType === 'Login' ? 
                    <Authentication type={authType} onSubmit={submit} /> : null
            }

            {
                /* header title for the section */
                plan !== '' || authType === 'Login' ? 
                    <HeaderTitle title={headerTitle.title} subTitle={headerTitle.subTitle} /> : null
            }

            {
                /* sign up Component */
                showSignup ? 
                    <Authentication onSubmit={submit} /> : null
            }

            {
                /* set up payment */
                showPaymentChoice ? (<SetPayment enterCard={goToEnterCard} />) : null
            }

            {
                /* enter card Info */
                showCardInfo ? (<EnterCardInfo onSubmit={startSubscription} />) : null
            }
        </div>
    ) : null
}