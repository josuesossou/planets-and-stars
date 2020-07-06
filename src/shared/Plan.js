import React from 'react'
import { Text, Button } from './Shared'
import { Colors } from '../styles/inlineStyles'
import { GreenCheck } from '../assets/icons/Icons'
import '../styles/plan.css'
import '../styles/styles.css'

/**
 * @param {string} planTitle the title of the plan
 * @param {string | number} monthlyPrice the monthly price of the plan
 * @param {string} discription the description of the plan
 * @param {string[]} planOffers the features the plan provides.
 * @param {function} onClick the callback when the choose plan button is clicked
 */
export default ({ planTitle, monthlyPrice, discription, planOffers, onClick }) => (
    <div id="plan-wrapper">
        <Text text={planTitle} capitalize style={styles.planTitleStyle} fontSize={14} />
        <div className="monthly-price text-lightGrey">
            <Text text={`$${monthlyPrice} / `} fontSize={51} /> 
            <Text text={'month'} fontSize={25} style={styles.monthlyPriceTwoStyle} />
        </div>
        <Text text={discription} style={styles.discriptionStyle} fontSize={10} />
        <Button text='Choose Plan' capitalize onClick={() => onClick(planTitle)} style={styles.buttonStyle} />
        {
            planOffers.map((plan, index) => (
                <div key={plan + index} className='plan-offers'>
                    <Text text={plan} fontSize={24} color={Colors.grey} />
                    <img alt='green-check' src={GreenCheck}  />
                </div>
            ))
        }
    </div>
)

const styles = {
    planTitleStyle: {
        fontWeight: 'bold',
        Color: Colors.black,
        marginBottom: 20,
    },
    monthlyPriceTwoStyle: {
        alignSelf: 'flex-end'
    },
    discriptionStyle: {
        width: '60%',
        color: Colors.grey,
        marginBottom: 45,
        textAlign: 'center'
    },
    buttonStyle: {
        height: 60,
        width: '100%',
        marginBottom: 50
    },
    imgStyle: {
       width: 27
    }
}