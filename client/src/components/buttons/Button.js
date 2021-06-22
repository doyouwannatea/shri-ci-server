import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/button.css'

const Button = ({ type, action, children, icon, adaptive }) => {
    const classes = ['btn']

    switch (type) {
        case 'silent':
            classes.push('btn--silent')
            break
        case 'primary':
            classes.push('btn--primary')
            break
        default:
            break
    }

    if (icon) {
        classes.push('btn--icon')
    }

    if (!children) {
        classes.push('btn--contentless')
    }

    if (adaptive) {
        classes.push('btn--adaptive')
    }

    return (
        <button
            className={classes.join(' ')}
            onClick={action}
            style={{ backgroundImage: `url(${icon})` }}>
            <span className="btn__content">
                {children}
            </span>
        </button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['silent', 'primary', 'default']),
    action: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    icon: PropTypes.string,
    adaptive: PropTypes.bool
}

export default Button