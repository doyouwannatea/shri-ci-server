import React from 'react'
import PropTypes from 'prop-types'

import '../styles/commit.css'

const Commit = ({ status }) => {
    const className = ['commit']

    switch (status) {
        case 'success':
            className.push('commit--success')
            break;
        case 'waiting':
            className.push('commit--waiting')
            break;
        case 'fail':
            className.push('commit--fail')
            break;
        default:
            break;
    }

    return (
        <div tabIndex="0" className={className.join(' ')}>

            <div>
                <div className="commit__inner">
                    <div className="commit__number">#1368</div>
                    <p className="commit__message">add documentation for postgres scaler</p>
                </div>

                <div className="commit__inner">
                    <div className="commit__branch with-before">master</div>
                    <div className="commit__hash">9c9f0b9</div>
                    <div className="commit__author with-before">Philip Kirkorov</div>
                </div>
            </div>

            <div className="commit__timings">
                <div className="commit__time with-before">21 янв, 03:06</div>
                <div className="commit__duration with-before">1 ч 20 мин</div>
            </div>

            <span className="commit__icon"></span>
            
        </div>
    )
}

Commit.propTypes = {
    status: PropTypes.oneOf(['fail', 'waiting', 'success']).isRequired
}

export default Commit