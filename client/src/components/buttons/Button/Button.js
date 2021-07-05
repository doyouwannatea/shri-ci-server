import React from 'react'
import PropTypes from 'prop-types'

import './index.css'

const Button = ({ type, variant, action, children, icon, adaptive, disabled }) => {
    const classes = ['btn']

    switch (variant) {
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
            data-testid="button"
            className={classes.join(' ')}
            onClick={action}
            style={{ backgroundImage: `url(${icon})` }}
            disabled={disabled}
            type={type}>
            <span className="btn__content">
                {children}
            </span>
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['silent', 'primary', 'default']),
    type: PropTypes.string,
    action: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    icon: PropTypes.string,
    adaptive: PropTypes.bool,
    disabled: PropTypes.bool
}

export default Button