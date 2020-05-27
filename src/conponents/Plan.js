import React from 'react'
import { Text, Button } from '../shared/Shared'

/**
 * @param {string} planTitle the title of the plan
 * @param {string} monthlyPrice the monthly price of the plan
 * @param {string} discription the description of the plan
 * @param {string[]} planOffers the features the plan provides.
 * @param {function} onClick the callback when the choose plan button is clicked
 */
export default ({ planTitle, monthlyPrice, discription, planOffers, onClick }) => (
    <div>
        <Text text={planTitle} capitalize />
        <div>
            <Text text={`${monthlyPrice} / `} /> 
            <Text text={'month'} />
        </div>
        <Text text={discription} />
        <Button text='Choose Plan' capitalize onClick={onClick} />
        {
            planOffers.map(plan => (
                <div>
                    <Text text={plan} />
                    <img />
                </div>
            ))
        }
    </div>
)