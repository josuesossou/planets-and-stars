import React from 'react'
import { Plan } from '../shared/Shared'
import { 
    SOLAR_SYSTEM, 
    STANDARD_PLAN_DISCRIPTION, 
    PREMIUM_PLAN_DISCRIPTION,
    STANDARD_TEXT,
    PREMIUM_TEXT,
    CREATOR,
    SIMULATION
} from '../styles/strings'

/**
 * @param {function} onChoosePlan 
 * when choose plan button is clicked. the name of the plan is passed as a argument
 */
export default ({ onChoosePlan }) => (
    <div
        style={{ 
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
            height: '100%',
            width: '100%',
        }}
    >
        <Plan 
            planTitle={STANDARD_TEXT} 
            monthlyPrice={0} 
            description={STANDARD_PLAN_DISCRIPTION} 
            planOffers={[
                SOLAR_SYSTEM
            ]}
            onClick={onChoosePlan}
        />
        <Plan 
            planTitle={PREMIUM_TEXT} 
            monthlyPrice={1.99} 
            description={PREMIUM_PLAN_DISCRIPTION} 
            planOffers={[
                SOLAR_SYSTEM,
                CREATOR,
                SIMULATION
            ]}
            onClick={onChoosePlan}
        />
    </div>
)