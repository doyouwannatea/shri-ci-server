import React from 'react'

import './Button.css'

type Action = (e: React.MouseEvent) => void

interface ButtonProps {
    variant?: 'silent' | 'primary' | 'default'
    type?: 'submit' | 'reset' | 'button'
    icon?: string
    testId?: string
    action?: Action
    children?: React.ReactNode
    adaptive?: boolean
    disabled?: boolean
}

const Button = ({ type, variant, action, children, icon, adaptive, disabled, testId }: ButtonProps) => {
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
            data-testid={testId || 'button'}
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

export default Button